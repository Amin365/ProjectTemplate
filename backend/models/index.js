import sequelize from '../config/database.js';
import User from './user.js';
import Role from './Role.js';


import RefreshToken from './RefreshToken.js';
import Permission from './Permissions.js';
import PermissionCategory from './PermissionCategory.js';
import RolePermission from './RolePermission.js';
import UserPermission from './UserPermission.js';

import Notification from './Notification.js';
import NotificationPreferences from './NotificationPreferences.js';


import AuditLog from './AuditLog.js';

import PushSubscription from './ushSubscription.js';

import SuspendedIp from './SuspendedIp.js';

// ── Associations 

// Role ↔ User
User.belongsTo(Role, { foreignKey: 'role_id', as: 'roleInfo' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id' });

// Member ↔ Role


// User self-references
User.belongsTo(User, { foreignKey: 'added_by', as: 'addedByUser' });
User.belongsTo(User, { foreignKey: 'updated_by', as: 'updatedByUser' });
User.belongsTo(User, { foreignKey: 'invited_by', as: 'invitedByUser' });

// Permission ↔ PermissionCategory
Permission.belongsTo(PermissionCategory, { foreignKey: 'category_id', as: 'category' });
PermissionCategory.hasMany(Permission, { foreignKey: 'category_id' });

// RolePermission associations
RolePermission.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
RolePermission.belongsTo(Permission, { foreignKey: 'permission_id', as: 'permission' });
Role.hasMany(RolePermission, { foreignKey: 'role_id' });
Permission.hasMany(RolePermission, { foreignKey: 'permission_id' });
RolePermission.belongsTo(User, { foreignKey: 'added_by', as: 'addedBy' });

// UserPermission associations
UserPermission.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
UserPermission.belongsTo(Permission, { foreignKey: 'permission_id', as: 'permission' });
User.hasMany(UserPermission, { foreignKey: 'user_id' });

// Issue associations

// IssueRequest associations

// Notification associations
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// NotificationPreferences associations
NotificationPreferences.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(NotificationPreferences, { foreignKey: 'user_id' });


// Comment associations


// CommentReport associations

// AuditLog associations
AuditLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });



// RefreshToken associations
RefreshToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Resource associations

// PushSubscription associations
PushSubscription.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export {
  sequelize,
  User,
  Role,

  RefreshToken,
  Permission,
  PermissionCategory,
  RolePermission,
  UserPermission,
  Notification,
  NotificationPreferences,
 

  AuditLog,

  PushSubscription,
  
  SuspendedIp,
};
