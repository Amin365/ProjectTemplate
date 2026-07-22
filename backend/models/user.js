import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true, allowNull: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  middle_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  member_id: { type: DataTypes.STRING, unique: true },
  status: { type: DataTypes.ENUM('Active', 'Inactive', 'pending'), defaultValue: 'Active' },
  Bio: { type: DataTypes.TEXT },
  profile_picture: { type: DataTypes.STRING, defaultValue: '' },
  role_id: { type: DataTypes.INTEGER, allowNull: true },
  member_id_fk: { type: DataTypes.INTEGER, allowNull: true, unique: true },
  added_by: { type: DataTypes.INTEGER, allowNull: true },
  updated_by: { type: DataTypes.INTEGER, allowNull: true },
  resetPasswordCode: { type: DataTypes.STRING },
  resetPasswordExpires: { type: DataTypes.DATE },
  mustChangePassword: { type: DataTypes.BOOLEAN, defaultValue: false },
  inviteToken: { type: DataTypes.STRING },
  inviteTokenExpires: { type: DataTypes.DATE },
  invited_by: { type: DataTypes.INTEGER, allowNull: true },
  invitedAt: { type: DataTypes.DATE },
  lastPasswordChange: { type: DataTypes.DATE },
  passwordChangedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  failedLoginAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  lockUntil: { type: DataTypes.DATE, allowNull: true },
  lastLoginIp: { type: DataTypes.STRING, allowNull: true },
  lastLoginUserAgent: { type: DataTypes.STRING, allowNull: true },
}, { tableName: 'users', timestamps: true });

User.addHook('beforeSave', async (user) => {
  if (!user.changed('password')) return;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.lastPasswordChange = new Date();
  if (!user.isNewRecord) {
    user.passwordChangedCount = (user.passwordChangedCount || 0) + 1;
  }
});

User.prototype.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default User;
