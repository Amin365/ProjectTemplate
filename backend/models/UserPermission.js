import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserPermission = sequelize.define('UserPermission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  permission_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'user_permissions',
  timestamps: false,
  indexes: [{ unique: true, fields: ['user_id', 'permission_id'] }],
});

export default UserPermission;
