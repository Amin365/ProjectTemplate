import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
  type: { type: DataTypes.ENUM('info', 'success', 'warning', 'error', 'approval', 'reminder', 'announcement'), defaultValue: 'info' },
  category: { type: DataTypes.ENUM('system', 'issue', 'report', 'challenge', 'achievement', 'goal', 'blog', 'join', 'announcement', 'other'), defaultValue: 'system' },
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
  meta: { type: DataTypes.JSON, defaultValue: {} },
  expiresAt: { type: DataTypes.DATE },
}, {
  tableName: 'notifications',
  timestamps: true,
  indexes: [
    { fields: ['user_id', 'read', 'createdAt'] },
    { fields: ['user_id', 'createdAt'] },
    { fields: ['expiresAt'] },
  ],
});

export default Notification;
