import DailyReport from "../models/DailyReport.js";
import { Op } from 'sequelize';
import User from "../models/user.js";
import Notification from "../models/Notification.js";
import Role from "../models/Role.js";
import { sendPushToUser } from "../utility/push.js";

/* 
   DATE UTILS (UTC SAFE)
 */

function toUTCDateOnly(date) {
  const d = new Date(date);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function getYesterdayUTC(date) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() - 1);
  return d;
}

/* 
   MAIN NOTIFICATION LOGIC
 */

export async function notifyUsersMissingDailyReport() {
  const today = toUTCDateOnly(new Date());
  const yesterday = getYesterdayUTC(today);
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  const membersRole = await Role.findOne({
    where: {
      role: {
        [Op.in]: ["Members", "Member", "members", "member"],
      },
    },
    attributes: ["id"],
  });

  if (!membersRole?.id) return;

  // Get all member IDs that are linked to users
  const memberRows = await User.findAll({
    where: { member_id_fk: { [Op.ne]: null } },
    attributes: ["member_id_fk"],
    group: ["member_id_fk"],
    raw: true,
  });
  const memberIds = memberRows.map((row) => row.member_id_fk).filter(Boolean);

  for (const memberId of memberIds) {
    // Get all users under this member
    const users = await User.findAll({
      where: { member_id_fk: memberId, role_id: membersRole.id },
      attributes: ["id", "first_name", "last_name", "email", "role_id"],
      raw: true,
    });

    if (!users.length) continue;

    // Check if ANY user submitted report today or yesterday
    const hasRecentReport = (await DailyReport.count({
      where: {
        created_by: { [Op.in]: users.map((u) => u.id) },
        readingDate: {
          [Op.gte]: toUTCDateOnly(yesterday),
          [Op.lt]: tomorrow,
        },
      },
      limit: 1,
    })) > 0;

    if (hasRecentReport) continue;

    for (const user of users) {
      // Avoid duplicate notification for same day
      const alreadyNotified = await Notification.findOne({
        where: {
          user_id: user.id,
          type: "warning",
          title: "Don't break your streak!",
          createdAt: {
            [Op.gte]: today,
            [Op.lt]: tomorrow,
          },
        },
      });

      if (alreadyNotified) continue;

      const message = `Mr ${user.first_name} ${user.last_name}, don’t break your reading streak! You haven’t submitted your daily reading report for today or yesterday.`;

      // Save notification (Members only)
      await Notification.create({
        user_id: user.id,
        title: "Don't break your streak!",
        message,
        type: "warning",
        meta: {
          kind: "missed-daily-report",
          forDate: today.toISOString().slice(0, 10),
          memberId,
        },
      });

      // Send push notification (Members only)
      try {
        await sendPushToUser(user.id, {
          title: "Don't break your reading streak!",
          body: message,
        });
      } catch (err) {
        console.error("Push notification failed:", err);
      }
    }
  }
}

/* 
   SCHEDULER
 */

export function startDailyReportMissingScheduler(
  intervalMs = 60 * 60 * 1000 // every 1 hour
) {
  // Run immediately
  notifyUsersMissingDailyReport().catch((err) =>
    console.error("Initial scheduler error:", err)
  );

  // Run repeatedly
  return setInterval(() => {
    notifyUsersMissingDailyReport().catch((err) =>
      console.error("Scheduler error:", err)
    );
  }, intervalMs);
}
