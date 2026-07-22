import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Permission = sequelize.define('Permission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  permission: { type: DataTypes.STRING, unique: true, allowNull: false },
  grouped_under: { type: DataTypes.STRING },
  subgroup_string: { type: DataTypes.STRING },
  system: { type: DataTypes.BOOLEAN, defaultValue: false },
  category_id: { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: 'permissions', timestamps: false });

export default Permission;
