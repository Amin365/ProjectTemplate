
// src/utils/defaultUsersAndRoles.js
import bcrypt from 'bcryptjs';
import RolePermission from '../models/RolePermission.js';
import User from '../models/user.js';
import UserPermission from '../models/UserPermission.js';

export const defaultUsersAndRoles = async () => {
  try {
    // -------------------------------
    // Role permissions mapping
    // -------------------------------
    const rolePermissions = [
      // Example: { role: 'SUPER_ADMIN_ROLE_OBJECT_ID', permissions: [/* array of Permission ObjectIds */] }
      // Fill this based on your roles and permission ObjectIds
    ];

    for (const { role, permissions } of rolePermissions) {
      for (const permission of permissions) {
        const where = { role_id: role, permission_id: permission };
        const [rolePermission, created] = await RolePermission.findOrCreate({
          where,
          defaults: { ...where, system: true, added_by: 1 },
        });
        if (!created) {
          await rolePermission.update({ system: true, added_by: 1 });
        }
      }
    }

    // -------------------------------
    // Default users
    // -------------------------------
    const users = [
      // Example:
      // {
      //   first_name: "Super",
      //   last_name: "Admin",
      //   username: "superadmin",
      //   password: "password123",
      //   email: "superadmin@example.com",
      //   role: "SUPER_ADMIN_ROLE_OBJECT_ID",
      //   warehouse: null
      // }
    ];

    for (const userData of users) {
      const { first_name, middle_name, last_name, username, password, email, role, warehouse } = userData;

      const hashedPassword = await bcrypt.hash(password, 10);

      const userPayload = {
        first_name,
        middle_name,
        last_name,
        username,
        email,
        password: hashedPassword,
        role_id: role,
        confirmed: true,
        added_by: 1,
        updated_by: 1,
      };
      const [user, created] = await User.findOrCreate({
        where: { username },
        defaults: userPayload,
      });
      if (!created) {
        await user.update(userPayload);
      }

      // Add permissions from role
      const rolePerm = rolePermissions.find(rp => rp.role.toString() === role.toString());
      if (rolePerm?.permissions?.length) {
        for (const permission of rolePerm.permissions) {
          await UserPermission.findOrCreate({
            where: { user_id: user.id, permission_id: permission },
            defaults: { user_id: user.id, permission_id: permission },
          });
        }
      }
    }

    console.log("Default users and role permissions initialized ✅");
  } catch (error) {
    console.error("Error initializing default users and roles:", error);
  }
};

// Default export to integrate with runMigrations
export default async function runDefaultUsersAndRoles() {
  await defaultUsersAndRoles();
}
