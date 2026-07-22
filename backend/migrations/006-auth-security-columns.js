import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default async function runAuthSecurityColumnsMigration() {
  try {
    const qi = sequelize.getQueryInterface();
    const usersTable = await qi.describeTable("users");

    if (!usersTable.failedLoginAttempts) {
      await qi.addColumn("users", "failedLoginAttempts", {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }

    if (!usersTable.lockUntil) {
      await qi.addColumn("users", "lockUntil", {
        type: DataTypes.DATE,
        allowNull: true,
      });
    }

    if (!usersTable.lastLoginIp) {
      await qi.addColumn("users", "lastLoginIp", {
        type: DataTypes.STRING,
        allowNull: true,
      });
    }

    if (!usersTable.lastLoginUserAgent) {
      await qi.addColumn("users", "lastLoginUserAgent", {
        type: DataTypes.STRING,
        allowNull: true,
      });
    }

    console.log("Auth security columns migration completed ✅");
  } catch (error) {
    console.error("Auth security columns migration failed:", error);
  }
}
