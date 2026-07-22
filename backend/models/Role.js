import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING, allowNull: false, unique: true },
  plural: { type: DataTypes.STRING },
  color: { type: DataTypes.STRING(10), defaultValue: '#00000000' },
  system: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'roles', timestamps: false });

export default Role;
