import express from 'express'
import { protect } from '../middleware/auth.js';
import { requirePermission } from '../middleware/role.js';
import { apiLimiter } from '../utility/rateLimiter.js';
import { 
  createRole, 
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  addPermissionToRole,
  removePermissionFromRole,
  getPermissions,
  getPermissionCategories,
  getPermissionMatrix,
  bulkUpdateRolePermissions,
} from '../controller/Rolecontroller.js'

const RoleRouter = express.Router();

const canViewRoles = [protect, requirePermission(["View Role", "Add Role", "Edit Role", "Delete Role"])];
const canManageRoles = [protect, requirePermission(["Add Role", "Edit Role", "Delete Role"])];

// Permission routes
RoleRouter.get('/permissions', canViewRoles, apiLimiter, getPermissions);
RoleRouter.get('/permission-categories', canViewRoles, apiLimiter, getPermissionCategories);
RoleRouter.get('/permission-matrix', canViewRoles, apiLimiter, getPermissionMatrix);

// Role routes
RoleRouter.get('/roles', canViewRoles, apiLimiter, getRoles);
RoleRouter.get('/roles/:id', canViewRoles, apiLimiter, getRoleById);
RoleRouter.post('/roles', canManageRoles, apiLimiter, createRole);
RoleRouter.put('/roles/:id', canManageRoles, apiLimiter, updateRole);
RoleRouter.delete('/roles/:id', canManageRoles, apiLimiter, deleteRole);

// Role-permission management
RoleRouter.post('/roles/:id/permissions', canManageRoles, apiLimiter, addPermissionToRole);
RoleRouter.put('/roles/:id/permissions/bulk', canManageRoles, apiLimiter, bulkUpdateRolePermissions);
RoleRouter.delete('/roles/:id/permissions/:permissionId', canManageRoles, apiLimiter, removePermissionFromRole);

export default RoleRouter;

