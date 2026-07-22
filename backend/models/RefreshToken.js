import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RefreshToken = sequelize.define('RefreshToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tokenHash: { type: DataTypes.STRING, unique: true, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  createdAt: { type: DataTypes.DATE },
  revoked: { type: DataTypes.BOOLEAN, defaultValue: false },
  replacedByTokenHash: { type: DataTypes.STRING },
  ip: { type: DataTypes.STRING },
  userAgent: { type: DataTypes.STRING },
}, { tableName: 'refresh_tokens', timestamps: false });

export default RefreshToken;
