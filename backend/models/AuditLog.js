import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AuditLog = sequelize.define('AuditLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: true },
  userEmail: { type: DataTypes.STRING },
  userName: { type: DataTypes.STRING },
  userRole: { type: DataTypes.STRING },
  action: { type: DataTypes.STRING, allowNull: false },
  entityType: { type: DataTypes.STRING },
  entityId: { type: DataTypes.INTEGER, allowNull: true },
  entityLabel: { type: DataTypes.STRING },
  changes: { type: DataTypes.JSON, defaultValue: {} },
  meta: { type: DataTypes.JSON, defaultValue: {} },
  ipAddress: { type: DataTypes.STRING },
  userAgent: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
}, { tableName: 'audit_logs', timestamps: true });

export default AuditLog;
