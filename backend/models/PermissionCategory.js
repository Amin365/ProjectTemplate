import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PermissionCategory = sequelize.define('PermissionCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  system: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'permission_categories', timestamps: false });

export default PermissionCategory;
