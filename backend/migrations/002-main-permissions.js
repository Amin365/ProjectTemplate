import RolePermission from '../models/RolePermission.js';
import UserPermission from '../models/UserPermission.js';
import Permission from '../models/Permissions.js';
import PermissionCategory from '../models/PermissionCategory.js';
import Role from '../models/Role.js';
import User from '../models/user.js';

const resolveSeederUser = async () => {
  const superAdminRole = await Role.findOne({ where: { role: "Super Admin" } });
  if (superAdminRole) {
    const roleUser = await User.findOne({ where: { role_id: superAdminRole.id } });
    if (roleUser) return roleUser;
  }
  return User.findOne({ order: [["id", "ASC"]] });
};

export const mainPermissions = async () => {
  try {
    // 
    // Create permission categories
    // 
    const categoriesData = [
      { name: "General Settings", system: true },
      { name: "Main System", system: true },
      { name: "States", system: true },
    ];

    const categories = {};
    for (const cat of categoriesData) {
      const [category, created] = await PermissionCategory.findOrCreate({
        where: { name: cat.name },
        defaults: cat,
      });
      if (!created) {
        await category.update(cat);
      }
      categories[cat.name] = category;
    }

    // 
    // Create permissions
    // 
    const permissionsData = [
      { permission: "Preferences", system: true, category: categories["General Settings"].id, grouped_under: "" },
      { permission: "Add Users", system: true, category: categories["General Settings"].id, grouped_under: "Manage Users" },
      { permission: "Edit Users", system: true, category: categories["General Settings"].id, grouped_under: "Manage Users" },
      { permission: "Delete Users", system: true, category: categories["General Settings"].id, grouped_under: "Manage Users" },
      { permission: "View Users", system: true, category: categories["General Settings"].id, grouped_under: "Manage Users" },
      { permission: "View Detail", system: true, category: categories["General Settings"].id, grouped_under: "Manage Users" },
      { permission: "Add Role", system: true, category: categories["General Settings"].id, grouped_under: "Manage Roles" },
      { permission: "Edit Role", system: true, category: categories["General Settings"].id, grouped_under: "Manage Roles" },
      { permission: "Delete Role", system: true, category: categories["General Settings"].id, grouped_under: "Manage Roles" },
      { permission: "View Role", system: true, category: categories["General Settings"].id, grouped_under: "Manage Roles" },
      { permission: "Manage States", system: true, category: categories["States"].id, grouped_under: "" },
      { permission: "Manage Books", system: true, category: categories["Main System"].id, grouped_under: "" },
      { permission: "Manage Members", system: true, category: categories["Main System"].id, grouped_under: "" },
      { permission: "Manage Issues", system: true, category: categories["Main System"].id, grouped_under: "" },
      { permission: "View Moderator", system: true, category: categories["Main System"].id, grouped_under: "" },
      { permission: "View Members", system: true, category: categories["Main System"].id, grouped_under: "" }
    ];

    const permissions = {};
    for (const perm of permissionsData) {
      const payload = {
        permission: perm.permission,
        system: perm.system,
        grouped_under: perm.grouped_under,
        category_id: perm.category,
      };
      const [permission, created] = await Permission.findOrCreate({
        where: { permission: perm.permission },
        defaults: payload,
      });
      if (!created) {
        await permission.update(payload);
      }
      permissions[perm.permission] = permission;
    }

    // 
    // Assign permissions to system roles
    // 
    const rolesData = await Role.findAll();
    const roles = {};
    rolesData.forEach(r => { roles[r.role] = r; });

    const SUPER_ADMIN_USER = await resolveSeederUser();

    // Assign all permissions to Super Admin
    if (roles["Super Admin"] && SUPER_ADMIN_USER) {
      for (const perm of Object.values(permissions)) {
        const rolePermissionWhere = {
          role_id: roles["Super Admin"].id,
          permission_id: perm.id,
        };
        const [rolePermission, createdRolePermission] = await RolePermission.findOrCreate({
          where: rolePermissionWhere,
          defaults: {
            ...rolePermissionWhere,
            system: true,
            added_by: SUPER_ADMIN_USER.id,
          },
        });
        if (!createdRolePermission) {
          await rolePermission.update({
            system: true,
            added_by: SUPER_ADMIN_USER.id,
          });
        }

        await UserPermission.findOrCreate({
          where: {
            user_id: SUPER_ADMIN_USER.id,
            permission_id: perm.id,
          },
          defaults: {
            user_id: SUPER_ADMIN_USER.id,
            permission_id: perm.id,
          },
        });
      }
    }

    const rolePermissionMap = {
      Moderator: ["View Moderator", "View Users", "View Members","Manage Members","Manage Issues"],
      Members: ["Manage Issues"],
      "Book Store": ["Manage Books" ,"Manage Issues"],
    };

for (const [roleName, permNames] of Object.entries(rolePermissionMap)) {
  const roleDoc = roles[roleName];
  if (!roleDoc) continue;

  for (const permName of permNames) {
    const permDoc = permissions[permName];
    if (!permDoc) continue;

    const where = { role_id: roleDoc.id, permission_id: permDoc.id };
    const [rolePermission, createdRolePermission] = await RolePermission.findOrCreate({
      where,
      defaults: {
        ...where,
        system: true,
        added_by: SUPER_ADMIN_USER?.id || null,
      },
    });
    if (!createdRolePermission) {
      await rolePermission.update({
        system: true,
        added_by: SUPER_ADMIN_USER?.id || null,
      });
    }
  }
}

    console.log("Permissions initialized ✅");
  } catch (error) {
    console.error("Error initializing permissions:", error);
  }
};

// Default export so runMigrations executes this file
export default async function runMainPermissions() {
  await mainPermissions();
}
