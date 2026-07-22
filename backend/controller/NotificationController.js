import Notification from "../models/Notification.js";
import { Op, literal, where as sqlWhere } from "sequelize";
import User from "../models/user.js";
import Role from "../models/Role.js";

const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

// Helper to get user role info
async function getUserRoleInfo(userId) {
  const currentUser = await User.findByPk(Number(userId), {
    attributes: ["id", "role_id"],
    include: [{ model: Role, as: "role", attributes: ["role", "plural"], required: false }],
  });

  const roleName = (currentUser?.role?.role || currentUser?.role?.plural || "").toLowerCase();
  const isSuperAdmin = /super\s*admin/i.test(roleName);

  return { currentUser, roleName, isSuperAdmin };
}

// Helper to build notification filter based on role
async function buildNotificationFilter(userId, roleInfo, extraFilters = {}) {
  const { isSuperAdmin } = roleInfo;
  let notifFilter = { ...extraFilters };

  const metaKindExpr = literal("JSON_UNQUOTE(JSON_EXTRACT(meta, '$.kind'))");

  if (isSuperAdmin) {
    notifFilter = {
      ...notifFilter,
      // keep all except member missed-report reminders
      [Op.or]: [
        sqlWhere(metaKindExpr, { [Op.ne]: "missed-daily-report" }),
        { meta: null },
      ],
    };
  } else {
    notifFilter = { ...notifFilter, user_id: Number(userId) };
  }

  return notifFilter;
}

// List notifications
export const listNotifications = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { page = 1, limit = 10, type, category, read } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const offset = (pageNum - 1) * perPage;

    const roleInfo = await getUserRoleInfo(userId);

    const extraFilters = {};
    if (type) extraFilters.type = String(type);
    if (category) extraFilters.category = String(category);
    if (read !== undefined) extraFilters.read = String(read) === "true";

    const where = await buildNotificationFilter(userId, roleInfo, extraFilters);

    const { rows: items, count: total } = await Notification.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      offset,
      limit: perPage,
    });

    return res.json({
      data: items,
      total,
      page: pageNum,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
    });
  } catch (err) {
    return next(err);
  }
};

// Mark ALL notifications as read (scoped)
export const markAllRead = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const roleInfo = await getUserRoleInfo(userId);
    const where = await buildNotificationFilter(userId, roleInfo, { read: false });

    await Notification.update({ read: true }, { where });
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

// Mark ONE notification as read
export const markOneRead = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid notification id" });

    const notif = await Notification.findByPk(Number(id));
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    const roleInfo = await getUserRoleInfo(userId);
    const { isSuperAdmin } = roleInfo;

    let allowed = false;
    if (isSuperAdmin) {
      allowed = true;
    } else if (String(notif.user_id) === String(userId)) {
      allowed = true;
    }

    if (!allowed) return res.status(403).json({ message: "Forbidden" });

    notif.read = true;
    await notif.save();

    return res.json({ data: notif });
  } catch (err) {
    return next(err);
  }
};

// Stats
export const getNotificationStats = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const roleInfo = await getUserRoleInfo(userId);
    const baseWhere = await buildNotificationFilter(userId, roleInfo, {});

    const [total, unread, allRows] = await Promise.all([
      Notification.count({ where: baseWhere }),
      Notification.count({ where: { ...baseWhere, read: false } }),
      Notification.findAll({
        where: baseWhere,
        attributes: ["type", "category"],
        raw: true,
      }),
    ]);

    const byType = {};
    const byCategory = {};
    for (const row of allRows) {
      const t = row.type || "unknown";
      const c = row.category || "unknown";
      byType[t] = (byType[t] || 0) + 1;
      byCategory[c] = (byCategory[c] || 0) + 1;
    }

    return res.json({
      data: {
        total,
        unread,
        read: total - unread,
        byType,
        byCategory,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// Delete one notification
export const deleteNotification = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid notification id" });

    const notif = await Notification.findByPk(Number(id));
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    const roleInfo = await getUserRoleInfo(userId);
    const { isSuperAdmin } = roleInfo;

    if (!isSuperAdmin && String(notif.user_id) !== String(userId)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await notif.destroy();
    return res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    return next(err);
  }
};

// Delete all read notifications (scoped)
export const deleteAllRead = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const roleInfo = await getUserRoleInfo(userId);
    const { isSuperAdmin } = roleInfo;

    const where = { read: true };
    if (!isSuperAdmin) where.user_id = Number(userId);

    const deletedCount = await Notification.destroy({ where });

    return res.json({
      success: true,
      message: `Deleted ${deletedCount} notifications`,
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  listNotifications,
  markAllRead,
  markOneRead,
  getNotificationStats,
  deleteNotification,
  deleteAllRead,
};