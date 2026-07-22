import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const NotificationPreferences = sequelize.define('NotificationPreferences', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  pushOnOverdue: { type: DataTypes.BOOLEAN, defaultValue: true },
  pushOnDueTomorrow: { type: DataTypes.BOOLEAN, defaultValue: true },
  pushOnStreakReminder: { type: DataTypes.BOOLEAN, defaultValue: true },
  pushOnBlogAnnouncement: { type: DataTypes.BOOLEAN, defaultValue: true },
  pushOnJoinRequestUpdate: { type: DataTypes.BOOLEAN, defaultValue: true },
  pushOnChallengeReminder: { type: DataTypes.BOOLEAN, defaultValue: true },
  pushOnAchievementUnlock: { type: DataTypes.BOOLEAN, defaultValue: true },
  pushOnGoalProgress: { type: DataTypes.BOOLEAN, defaultValue: true },
  pushOnSystemAnnouncement: { type: DataTypes.BOOLEAN, defaultValue: true },
  emailOnOverdue: { type: DataTypes.BOOLEAN, defaultValue: true },
  emailOnDueTomorrow: { type: DataTypes.BOOLEAN, defaultValue: false },
  emailOnWeeklyDigest: { type: DataTypes.BOOLEAN, defaultValue: true },
  emailOnJoinRequestUpdate: { type: DataTypes.BOOLEAN, defaultValue: true },
  emailOnGoalProgress: { type: DataTypes.BOOLEAN, defaultValue: true },
  emailOnAnnouncement: { type: DataTypes.BOOLEAN, defaultValue: true },
  quietHoursEnabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  quietHoursStart: { type: DataTypes.STRING, defaultValue: '22:00' },
  quietHoursEnd: { type: DataTypes.STRING, defaultValue: '08:00' },
}, { tableName: 'notification_preferences', timestamps: true });

export default NotificationPreferences;
