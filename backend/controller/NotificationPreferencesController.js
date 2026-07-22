import NotificationPreferences from "../models/NotificationPreferences.js";
import User from "../models/user.js";

const defaultPreferences = {
  pushOnOverdue: true,
  pushOnDueTomorrow: true,
  pushOnStreakReminder: true,
  pushOnBlogAnnouncement: true,
  pushOnJoinRequestUpdate: true,
  pushOnChallengeReminder: true,
  pushOnAchievementUnlock: true,
  pushOnGoalProgress: true,
  pushOnSystemAnnouncement: true,
  emailOnOverdue: true,
  emailOnDueTomorrow: false,
  emailOnWeeklyDigest: true,
  emailOnJoinRequestUpdate: true,
  emailOnGoalProgress: true,
  emailOnAnnouncement: true,
  quietHoursEnabled: false,
  quietHoursStart: "22:00",
  quietHoursEnd: "08:00",
};

const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

// Get user's notification preferences
export const getMyPreferences = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let prefs = await NotificationPreferences.findOne({
      where: { user_id: Number(userId) },
    });

    if (!prefs) {
      // Do not persist yet, just return defaults merged with user_id
      prefs = { user_id: Number(userId), ...defaultPreferences };
    }

    return res.json({ data: prefs });
  } catch (err) {
    return next(err);
  }
};

// Update user's notification preferences
export const updateMyPreferences = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const allowedFields = [
      "pushOnOverdue",
      "pushOnDueTomorrow",
      "pushOnStreakReminder",
      "pushOnBlogAnnouncement",
      "pushOnJoinRequestUpdate",
      "pushOnChallengeReminder",
      "pushOnAchievementUnlock",
      "pushOnGoalProgress",
      "pushOnSystemAnnouncement",
      "emailOnOverdue",
      "emailOnDueTomorrow",
      "emailOnWeeklyDigest",
      "emailOnJoinRequestUpdate",
      "emailOnGoalProgress",
      "emailOnAnnouncement",
      "quietHoursEnabled",
      "quietHoursStart",
      "quietHoursEnd",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    let prefs = await NotificationPreferences.findOne({
      where: { user_id: Number(userId) },
    });

    if (!prefs) {
      prefs = await NotificationPreferences.create({
        user_id: Number(userId),
        ...defaultPreferences,
        ...updates,
      });
    } else {
      await prefs.update(updates);
    }

    return res.json({ data: prefs, message: "Preferences updated successfully" });
  } catch (err) {
    return next(err);
  }
};

// Reset preferences to defaults
export const resetMyPreferences = async (req, res, next) => {
  try {
    const userId = req.user?.id ?? req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let prefs = await NotificationPreferences.findOne({
      where: { user_id: Number(userId) },
    });

    if (!prefs) {
      prefs = await NotificationPreferences.create({
        user_id: Number(userId),
        ...defaultPreferences,
      });
    } else {
      await prefs.update(defaultPreferences);
    }

    return res.json({ data: prefs, message: "Preferences reset to defaults" });
  } catch (err) {
    return next(err);
  }
};

// Helper: check preference key
export async function checkUserPreference(userId, preferenceKey) {
  if (!userId) return defaultPreferences[preferenceKey] ?? true;

  const prefs = await NotificationPreferences.findOne({
    where: { user_id: Number(userId) },
  });

  if (!prefs) return defaultPreferences[preferenceKey] ?? true;
  return prefs[preferenceKey] ?? defaultPreferences[preferenceKey] ?? true;
}

// Helper to parse "HH:mm"
function parseTimeString(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return null;

  const parts = timeStr.split(":");
  if (parts.length !== 2) return null;

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return hours * 60 + minutes;
}

// Check quiet hours
export async function isInQuietHours(userId) {
  if (!userId) return false;

  const prefs = await NotificationPreferences.findOne({
    where: { user_id: Number(userId) },
  });

  if (!prefs || !prefs.quietHoursEnabled) return false;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const startTime = parseTimeString(prefs.quietHoursStart);
  const endTime = parseTimeString(prefs.quietHoursEnd);

  if (startTime === null || endTime === null) {
    console.warn(
      `Invalid quiet hours format for user ${userId}:`,
      prefs.quietHoursStart,
      prefs.quietHoursEnd
    );
    return false;
  }

  // Overnight range: 22:00 -> 08:00
  if (startTime > endTime) {
    return currentTime >= startTime || currentTime < endTime;
  }

  return currentTime >= startTime && currentTime < endTime;
}

export default {
  getMyPreferences,
  updateMyPreferences,
  resetMyPreferences,
  checkUserPreference,
  isInQuietHours,
};