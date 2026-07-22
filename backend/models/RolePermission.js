import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RolePermission = sequelize.define('RolePermission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role_id: { type: DataTypes.INTEGER, allowNull: false },
  permission_id: { type: DataTypes.INTEGER, allowNull: false },
  system: { type: DataTypes.BOOLEAN, defaultValue: false },
  added_by: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'role_permissions',
  timestamps: false,
  indexes: [{ unique: true, fields: ['role_id', 'permission_id'] }],
});

export default RolePermission;
