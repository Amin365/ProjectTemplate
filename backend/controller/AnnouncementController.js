import { Op, fn, col, literal } from "sequelize";
import Notification from "../models/Notification.js";
import User from "../models/user.js";
import Role from "../models/Role.js";
import { sendMail, buildEmailHtml } from "./EmailController.js";
import { sendPushToUser } from "../utility/push.js";
import {
  checkUserPreference,
  isInQuietHours,
} from "./NotificationPreferencesController.js";

const APP_NAME = process.env.APP_NAME || "JJU Reading Club";
const VALID_AUDIENCES = ["all", "members", "moderators"];

const hasAnyPermission = (req, perms = []) => {
  const userPerms = new Set((req.user?.permissions || []).map((p) => String(p).toLowerCase()));
  return perms.some((p) => userPerms.has(String(p).toLowerCase()));
};

const hasAnnouncementAccess = (req) => {
  const roleName = String(req.user?.role?.role || req.user?.role?.plural || req.user?.role || "").toLowerCase();
  if (/super\s*admin/i.test(roleName) || /admin/i.test(roleName) || /moderator/i.test(roleName)) {
    return true;
  }
  return hasAnyPermission(req, ["Manage Members", "Manage Issues", "Edit Role"]);
};

async function isAdmin(userId) {
  const user = await User.findByPk(userId, {
    include: [{ model: Role, as: "role", attributes: ["id", "role", "plural"] }],
  });

  const roleName = (user?.role?.role || user?.role?.plural || "").toLowerCase();
  return /super\s*admin/i.test(roleName) || /admin/i.test(roleName);
}

async function getTargetAudience(targetAudience) {
  const baseUserQuery = {
    where: { status: "Active" },
    attributes: ["id", "email", "role_id"],
  };

  switch (targetAudience) {
    case "all":
      return User.findAll(baseUserQuery);

    case "members": {
      const memberRole = await Role.findOne({
        where: { role: { [Op.regexp]: "^members?$" } },
        attributes: ["id"],
      });
      if (!memberRole) return [];

      return User.findAll({
        ...baseUserQuery,
        where: { ...baseUserQuery.where, role_id: memberRole.id },
      });
    }

    case "moderators": {
      const modRole = await Role.findOne({
        where: { role: { [Op.regexp]: "^moderator$" } },
        attributes: ["id"],
      });
      if (!modRole) return [];

      return User.findAll({
        ...baseUserQuery,
        where: { ...baseUserQuery.where, role_id: modRole.id },
      });
    }

    default:
      return [];
  }
}

export const createAnnouncement = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!hasAnnouncementAccess(req) && !(await isAdmin(userId))) {
      return res.status(403).json({ message: "Only admins can create announcements" });
    }

    const {
      title,
      message,
      targetAudience = "all",
      sendEmail = false,
      sendPush = true,
      ctaLabel,
      ctaUrl,
      expiresAt,
    } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    if (!VALID_AUDIENCES.includes(targetAudience)) {
      return res.status(400).json({
        message: `Invalid target audience. Must be one of: ${VALID_AUDIENCES.join(", ")}`,
      });
    }

    const targetUsers = await getTargetAudience(targetAudience);
    if (!targetUsers.length) {
      return res.status(400).json({ message: "No users found for the selected audience" });
    }

    const notifications = targetUsers.map((u) => ({
      user_id: u.id,
      title,
      message,
      type: "announcement",
      category: "announcement",
      read: false,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      meta: {
        kind: "bulk-announcement",
        createdBy: userId,
        targetAudience,
        ctaLabel: ctaLabel || null,
        ctaUrl: ctaUrl || null,
      },
    }));

    await Notification.bulkCreate(notifications);

    if (sendPush) {
      for (const u of targetUsers) {
        try {
          const canSendPush = await checkUserPreference(u.id, "pushOnSystemAnnouncement");
          const inQuietHours = await isInQuietHours(u.id);

          if (canSendPush && !inQuietHours) {
            await sendPushToUser(u.id, {
              title: `📢 ${title}`,
              body: String(message).substring(0, 200),
              data: { url: ctaUrl || "/dashboard/notifications" },
            });
          }
        } catch (err) {
          console.error(`Push notification failed for user ${u.id}:`, err.message);
        }
      }
    }

    if (sendEmail) {
      for (const u of targetUsers) {
        try {
          const canSendEmail = await checkUserPreference(u.id, "emailOnAnnouncement");
          if (!canSendEmail) continue;

          const recipientEmail = u.email;
          if (!recipientEmail) continue;

          await sendMail({
            to: recipientEmail,
            subject: `📢 ${title}`,
            text: `Hello,\n\n${message}\n\nBest regards,\nThe ${APP_NAME} Team`,
            html: buildEmailHtml({
              title: `📢 ${title}`,
              preheader: String(message).substring(0, 100),
              greeting: "Hello",
              bodyLines: [message],
              ctaLabel: ctaLabel || null,
              ctaUrl: ctaUrl || null,
              footerNote: `This announcement was sent from ${APP_NAME}.`,
            }),
          });
        } catch (err) {
          console.error(`Email failed for user ${u.id}:`, err.message);
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: `Announcement sent to ${targetUsers.length} users`,
      data: { recipientCount: targetUsers.length, targetAudience, sendEmail, sendPush },
    });
  } catch (err) {
    return next(err);
  }
};

export const getAnnouncementHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!hasAnnouncementAccess(req) && !(await isAdmin(userId))) {
      return res.status(403).json({ message: "Only admins can view announcement history" });
    }

    const pageNum = Math.max(1, parseInt(req.query.page, 10) || 1);
    const perPage = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 20));
    const offset = (pageNum - 1) * perPage;

    const rows = await Notification.findAll({
      where: literal(`JSON_UNQUOTE(JSON_EXTRACT(meta, '$.kind')) = 'bulk-announcement'`),
      attributes: [
        "title",
        "message",
        [fn("MIN", col("createdAt")), "createdAt"],
        [literal(`JSON_UNQUOTE(JSON_EXTRACT(meta, '$.targetAudience'))`), "targetAudience"],
        [literal(`JSON_UNQUOTE(JSON_EXTRACT(meta, '$.createdBy'))`), "createdBy"],
        [fn("COUNT", col("id")), "recipientCount"],
        [fn("SUM", literal("CASE WHEN \`read\` = 1 THEN 1 ELSE 0 END")), "readCount"],
        [fn("DATE_FORMAT", col("createdAt"), "%Y-%m-%d %H:%i"), "timeBucket"],
      ],
      group: [
        "title",
        "message",
        literal(`JSON_UNQUOTE(JSON_EXTRACT(meta, '$.targetAudience'))`),
        literal(`JSON_UNQUOTE(JSON_EXTRACT(meta, '$.createdBy'))`),
        fn("DATE_FORMAT", col("createdAt"), "%Y-%m-%d %H:%i"),
      ],
      order: [[literal("createdAt"), "DESC"]],
      limit: perPage,
      offset,
      raw: true,
      subQuery: false,
    });

    const totalGrouped = await Notification.count({
      where: literal(`JSON_UNQUOTE(JSON_EXTRACT(meta, '$.kind')) = 'bulk-announcement'`),
      distinct: true,
      col: "title",
    });

    return res.json({
      data: rows,
      total: totalGrouped,
      page: pageNum,
      limit: perPage,
      totalPages: Math.ceil(totalGrouped / perPage),
    });
  } catch (err) {
    return next(err);
  }
};

export const getAudiencePreview = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!hasAnnouncementAccess(req) && !(await isAdmin(userId))) {
      return res.status(403).json({ message: "Only admins can preview audiences" });
    }

    const { targetAudience = "all" } = req.query;
    if (!VALID_AUDIENCES.includes(targetAudience)) {
      return res.status(400).json({ message: "Invalid target audience" });
    }

    const targetUsers = await getTargetAudience(targetAudience);

    return res.json({
      data: {
        targetAudience,
        count: targetUsers.length,
        preview: targetUsers.slice(0, 5).map((u) => ({
          id: u.id,
          email: u.email || null,
          name: "User",
        })),
      },
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  createAnnouncement,
  getAnnouncementHistory,
  getAudiencePreview,
};