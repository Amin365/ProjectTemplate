// src/utils/systemRoles.js
import Role from "../models/Role.js";
import User from "../models/user.js";

const resolveSeederUser = async (superAdminRoleId) => {
  if (superAdminRoleId) {
    const roleUser = await User.findOne({ where: { role_id: superAdminRoleId } });
    if (roleUser) return roleUser;
  }

  const superAdminRole = await Role.findOne({ where: { role: "Super Admin" } });
  if (superAdminRole) {
    const roleUser = await User.findOne({ where: { role_id: superAdminRole.id } });
    if (roleUser) return roleUser;
  }

  return User.findOne({ order: [["id", "ASC"]] });
};

export const systemRoles = async () => {
  try {
    // Define the roles
    const rolesData = [
      { role: "Super Admin", plural: "Super Admins", system: true, color: "#6366f1" },
      { role: "Members", plural: "Members", system: true, color: "#4f46e5" },
      { role: "Moderator", plural: "Moderators", system: true, color: "#10b981" },
      { role: "Book Store", plural: "Book Stores", system: true, color: "#6b7280" },
    ];

    // Insert or update roles
    const createdRoles = [];
    for (const roleData of rolesData) {
      const [role, created] = await Role.findOrCreate({
        where: { role: roleData.role },
        defaults: roleData,
      });
      if (!created) {
        await role.update(roleData);
      }
      createdRoles.push(role);
    }

    // Assign Super Admin role to first user
    const superAdminRole = createdRoles.find((r) => r.role === "Super Admin");
    const user = await resolveSeederUser(superAdminRole?.id);
    if (user && superAdminRole) {
        await user.update({ role_id: superAdminRole.id });
    }

    console.log("System roles initialized ✅");
  } catch (error) {
    console.error("Error initializing system roles:", error);
  }
};

// Default export so runMigrations can pick it up
export default async function runSystemRoles() {
  await systemRoles();
}
