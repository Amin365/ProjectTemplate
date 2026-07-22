import { Op } from "sequelize";
import Role from "../models/Role.js";
import Permission from "../models/Permissions.js";
import PermissionCategory from "../models/PermissionCategory.js";
import RolePermission from "../models/RolePermission.js";
import { logRoleAction, logAudit, buildChanges } from "../utility/auditLog.js";

/* - Helpers - */

const isValidId = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

const sanitizeString = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

/*  Role APIs  */

/**
 * Create a new role
 * POST /roles
 */
export async function createRole(req, res) {
  try {
    const { role, plural, color, system } = req.body;

    const roleName = sanitizeString(role);
    if (!roleName) {
      return res.status(400).json({ message: "Role name is required" });
    }

    const savedRole = await Role.create({
      role: roleName,
      plural: sanitizeString(plural),
      color: color || "#00000000",
      system: Boolean(system),
    });

    await logRoleAction("created", savedRole, req.user, req, {
      description: `Role "${savedRole.role}" was created`,
    });

    return res.status(201).json({ data: savedRole });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Role with this name already exists" });
    }
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * Get all roles with optional permission counts
 * GET /roles?includePermissions=true
 */
export async function getRoles(req, res) {
  try {
    const { includePermissions } = req.query;
    const roles = await Role.findAll();

    if (includePermissions !== "true") {
      return res.status(200).json({ data: roles });
    }

    const permissionCounts = await RolePermission.findAll({
      attributes: [
        "role_id",
        [Role.sequelize.fn("COUNT", Role.sequelize.col("permission_id")), "count"],
      ],
      group: ["role_id"],
      raw: true,
    });

    const countMap = {};
    for (const row of permissionCounts) {
      countMap[String(row.role_id)] = Number(row.count || 0);
    }

    const data = roles.map((role) => ({
      ...role.toJSON(),
      permissionCount: countMap[String(role.id)] || 0,
    }));

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * Get a single role by ID with its permissions
 * GET /roles/:id
 */
export async function getRoleById(req, res) {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid role ID" });
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const rolePermissions = await RolePermission.findAll({
      where: { role_id: Number(id) },
      include: [
        {
          model: Permission,
          as: "permission",
          required: false,
          include: [
            {
              model: PermissionCategory,
              as: "category",
              required: false,
            },
          ],
        },
      ],
      order: [["id", "ASC"]],
    });

    const permissions = rolePermissions
      .filter((rp) => rp.permission)
      .map((rp) => ({
        id: rp.permission.id,
        _id: rp.permission.id,
        permission: rp.permission.permission,
        category: rp.permission.category?.name || null,
        grouped_under: rp.permission.grouped_under ?? null,
        system: Boolean(rp.permission.system),
        addedAt: null,
      }));

    return res.status(200).json({
      data: {
        ...role.toJSON(),
        permissions,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * Update a role
 * PUT /roles/:id
 */
export async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { role, plural, color } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid role ID" });
    }

    const existing = await Role.findByPk(id);
    if (!existing) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (existing.system) {
      return res.status(403).json({ message: "Cannot modify system roles" });
    }

    const before = existing.toJSON();
    const updateData = {};

    if (role !== undefined) {
      const roleName = sanitizeString(role);
      if (!roleName) {
        return res.status(400).json({ message: "Role name cannot be empty" });
      }
      updateData.role = roleName;
    }

    if (plural !== undefined) {
      updateData.plural = sanitizeString(plural);
    }

    if (color !== undefined) {
      updateData.color = color;
    }

    if (Object.keys(updateData).length > 0) {
      await existing.update(updateData);
    }

    const after = existing.toJSON();
    const changes = buildChanges(before, after, ["role", "plural", "color"]);

    await logRoleAction("updated", existing, req.user, req, {
      changes,
      description: `Role "${existing.role}" was updated`,
    });

    return res.status(200).json({ data: existing });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Role with this name already exists" });
    }
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * Delete a role
 * DELETE /roles/:id
 */
export async function deleteRole(req, res) {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid role ID" });
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (role.system) {
      return res.status(403).json({ message: "Cannot delete system roles" });
    }

    const roleSnapshot = role.toJSON();

    await Role.sequelize.transaction(async (transaction) => {
      await RolePermission.destroy({
        where: { role_id: Number(id) },
        transaction,
      });

      await role.destroy({ transaction });
    });

    await logRoleAction("deleted", roleSnapshot, req.user, req, {
      description: `Role "${roleSnapshot.role}" was deleted`,
    });

    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/* --------------------------- Role Permission APIs -------------------------- */

/**
 * Add permission to role
 * POST /roles/:id/permissions
 */
export async function addPermissionToRole(req, res) {
  try {
    const { id } = req.params;
    const { permissionId } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid role ID" });
    }
    if (!isValidId(permissionId)) {
      return res.status(400).json({ message: "Invalid permission ID" });
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const permission = await Permission.findByPk(permissionId);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    const existing = await RolePermission.findOne({
      where: { role_id: Number(id), permission_id: Number(permissionId) },
    });

    if (existing) {
      return res.status(409).json({ message: "Permission already assigned to role" });
    }

    await RolePermission.create({
      role_id: Number(id),
      permission_id: Number(permissionId),
      added_by: req.user?.id || null,
    });

    await logAudit({
      user: req.user,
      action: "role.permission_added",
      entityType: "Role",
      entityId: role.id,
      entityLabel: role.role,
      req,
      meta: {
        permissionId: Number(permissionId),
        permissionName: permission.permission,
      },
      description: `Permission "${permission.permission}" added to role "${role.role}"`,
    });

    return res.status(201).json({ message: "Permission added to role" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * Remove permission from role
 * DELETE /roles/:id/permissions/:permissionId
 */
export async function removePermissionFromRole(req, res) {
  try {
    const { id, permissionId } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid role ID" });
    }
    if (!isValidId(permissionId)) {
      return res.status(400).json({ message: "Invalid permission ID" });
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const permission = await Permission.findByPk(permissionId);

    const deleted = await RolePermission.destroy({
      where: { role_id: Number(id), permission_id: Number(permissionId) },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Role-permission mapping not found" });
    }

    await logAudit({
      user: req.user,
      action: "role.permission_removed",
      entityType: "Role",
      entityId: role.id,
      entityLabel: role.role,
      req,
      meta: {
        permissionId: Number(permissionId),
        permissionName: permission?.permission || null,
      },
      description: `Permission "${permission?.permission || "unknown"}" removed from role "${role.role}"`,
    });

    return res.status(200).json({ message: "Permission removed from role" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/* ---------------------------- Permission APIs ----------------------------- */

/**
 * Get all permissions grouped by category
 * GET /permissions
 */
export async function getPermissions(req, res) {
  try {
    const permissions = await Permission.findAll({
      include: [{ model: PermissionCategory, as: "category", required: false }],
      order: [["id", "ASC"]],
    });

    const grouped = {};
    for (const p of permissions) {
      const categoryName = p.category?.name || "Uncategorized";
      if (!grouped[categoryName]) grouped[categoryName] = [];
      grouped[categoryName].push(p);
    }

    return res.status(200).json({ data: { permissions, grouped } });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * Get permission categories
 * GET /permission-categories
 */
export async function getPermissionCategories(req, res) {
  try {
    const categories = await PermissionCategory.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({ data: categories });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * Get permission matrix (all roles with their permissions)
 * GET /permission-matrix
 */
export async function getPermissionMatrix(req, res) {
  try {
    const roles = await Role.findAll({ order: [["id", "ASC"]] });

    const permissions = await Permission.findAll({
      include: [{ model: PermissionCategory, as: "category", required: false }],
      order: [["id", "ASC"]],
    });

    const rolePermissions = await RolePermission.findAll({
      attributes: ["role_id", "permission_id"],
      raw: true,
    });

    const matrix = {};
    for (const role of roles) {
      matrix[String(role.id)] = new Set();
    }

    for (const rp of rolePermissions) {
      const roleId = String(rp.role_id);
      if (matrix[roleId]) {
        matrix[roleId].add(String(rp.permission_id));
      }
    }

    const rolesWithPermissions = roles.map((role) => ({
      ...role.toJSON(),
      permissions: Array.from(matrix[String(role.id)] || []),
    }));

    const groupedPermissions = {};
    for (const p of permissions) {
      const categoryName = p.category?.name || "Uncategorized";
      if (!groupedPermissions[categoryName]) groupedPermissions[categoryName] = [];
      groupedPermissions[categoryName].push(p);
    }

    return res.status(200).json({
      data: {
        roles: rolesWithPermissions,
        permissions,
        groupedPermissions,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * Bulk update role permissions
 * PUT /roles/:id/permissions/bulk
 */
export async function bulkUpdateRolePermissions(req, res) {
  const transaction = await Role.sequelize.transaction();

  try {
    const { id } = req.params;
    const { permissionIds } = req.body;

    if (!isValidId(id)) {
      await transaction.rollback();
      return res.status(400).json({ message: "Invalid role ID" });
    }

    if (!Array.isArray(permissionIds)) {
      await transaction.rollback();
      return res.status(400).json({ message: "permissionIds must be an array" });
    }

    const role = await Role.findByPk(id, { transaction });
    if (!role) {
      await transaction.rollback();
      return res.status(404).json({ message: "Role not found" });
    }

    const currentPermissions = await RolePermission.findAll({
      where: { role_id: Number(id) },
      attributes: ["permission_id"],
      raw: true,
      transaction,
    });

    const currentPermIds = new Set(currentPermissions.map((rp) => Number(rp.permission_id)));

    const sanitizedNewIds = permissionIds
      .map((pid) => parseInt(pid, 10))
      .filter((pid) => Number.isInteger(pid) && pid > 0);

    const newPermIds = new Set(sanitizedNewIds);

    const toAdd = [...newPermIds].filter((pid) => !currentPermIds.has(pid));
    const toRemove = [...currentPermIds].filter((pid) => !newPermIds.has(pid));

    if (toRemove.length > 0) {
      await RolePermission.destroy({
        where: {
          role_id: Number(id),
          permission_id: { [Op.in]: toRemove },
        },
        transaction,
      });
    }

    if (toAdd.length > 0) {
      await RolePermission.bulkCreate(
        toAdd.map((pid) => ({
          role_id: Number(id),
          permission_id: pid,
          added_by: req.user?.id || null,
        })),
        { transaction }
      );
    }

    await transaction.commit();

    await logAudit({
      user: req.user,
      action: "role.updated",
      entityType: "Role",
      entityId: role.id,
      entityLabel: role.role,
      req,
      meta: { added: toAdd.length, removed: toRemove.length },
      description: `Role "${role.role}" permissions updated: ${toAdd.length} added, ${toRemove.length} removed`,
    });

    return res.status(200).json({
      message: "Role permissions updated",
      added: toAdd.length,
      removed: toRemove.length,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export default {
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
};