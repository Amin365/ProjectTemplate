import { runMigrations } from "../migrations/index.js";
import { mainPermissions } from "../migrations/002-main-permissions.js";
import Role from "../models/Role.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";




async function MigrateDefaults() {
  try {
    // Always run migrations so base data is present
    await runMigrations();
    console.log('Migrations ran successfully');

    // Ensure Super Admin role exists
    const superAdminRole = await Role.findOne({ where: { role: "Super Admin" } });

    // Upsert a superadmin user and attach the role
    const username = "aminbashir07";
    const password = "aminbashir07";

    const userPayload = {
      first_name: "Amin",
      middle_name: "Bashir",
      last_name: "Husein",
      username,
      email: "aminbashir07@gmail.com",
      // Keep plaintext here; User.beforeSave hook hashes it exactly once.
      password,
      role_id: superAdminRole?.id || null,
      status: "Active",
    };

    const [superAdminUser, created] = await User.findOrCreate({
      where: { username },
      defaults: userPayload,
    });

    if (!created) {
      await superAdminUser.update({
        first_name: userPayload.first_name,
        middle_name: userPayload.middle_name,
        last_name: userPayload.last_name,
        email: userPayload.email,
        role_id: userPayload.role_id,
        status: userPayload.status,
      });
    }

    // Always normalize seeded password so login remains deterministic.
    superAdminUser.password = password;
    await superAdminUser.save();

    const refreshedUser = await User.findOne({ where: { username } });
    const passwordOk = refreshedUser?.password
      ? await bcrypt.compare(password, refreshedUser.password)
      : false;
    if (!passwordOk) {
      throw new Error("Seeded superadmin password verification failed");
    }

    // Re-run permission assignment now that user exists
    await mainPermissions();

    console.log('✅ Default superadmin ensured');

  
  } catch (error) {
    console.error("❌ Error creating default user:", error);
  }
}

export default MigrateDefaults;
