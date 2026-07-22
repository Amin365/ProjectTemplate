import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Member = sequelize.define('Member', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true, allowNull: true },
  first_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  middle_name: { type: DataTypes.STRING, defaultValue: '' },
  last_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  code: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING, defaultValue: '' },
  email: { type: DataTypes.STRING, unique: true, allowNull: true },
  gender: { type: DataTypes.ENUM('Male', 'Female'), defaultValue: 'Male' },
  region: { type: DataTypes.STRING, defaultValue: '' },
  city: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('Active', 'Inactive', 'pending'), defaultValue: 'Active' },
  join_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  Profile_picture: { type: DataTypes.STRING, defaultValue: '' },
  isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
  department: { type: DataTypes.STRING, defaultValue: '' },
  student_id: { type: DataTypes.STRING, defaultValue: '' },
  study_year: { type: DataTypes.STRING, defaultValue: '' },
  role_id: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'members',
  timestamps: true,
  getterMethods: {
    full_name() {
      return [this.first_name, this.middle_name, this.last_name].filter(Boolean).join(' ');
    },
  },
});

Member.addHook('beforeCreate', (member) => {
  if (!member.code) {
    const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
    member.code = `MBR-${rnd}`;
  }
});

export default Member;
