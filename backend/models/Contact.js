import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Contact = sequelize.define('Contact', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false },
  phone: { type: DataTypes.STRING(64), allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: true },
  requestType: {
    type: DataTypes.ENUM('general', 'school_demo'),
    allowNull: false,
    defaultValue: 'general',
  },
  schoolName: { type: DataTypes.STRING(255), allowNull: true },
  schoolRole: { type: DataTypes.STRING(120), allowNull: true },
  schoolLocation: { type: DataTypes.STRING(255), allowNull: true },
  studentCount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  preferredDemoTime: { type: DataTypes.STRING(120), allowNull: true },
  source: { type: DataTypes.STRING(80), allowNull: false, defaultValue: 'xaltech_web' },
  status: { type: DataTypes.ENUM('new', 'read'), allowNull: false, defaultValue: 'new' },
}, { tableName: 'contacts', timestamps: true });

export default Contact;
