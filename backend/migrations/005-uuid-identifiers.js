import crypto from "crypto";
import { DataTypes } from "sequelize";
import User from "../models/user.js";
import Member from "../models/Members.js";
import sequelize from "../config/database.js";

export default async function runUuidIdentifiersMigration() {
  try {
    const qi = sequelize.getQueryInterface();

    const usersTable = await qi.describeTable("users");
    if (!usersTable.uuid) {
      await qi.addColumn("users", "uuid", {
        type: DataTypes.UUID,
        allowNull: true,
        unique: true,
      });
    }

    const membersTable = await qi.describeTable("members");
    if (!membersTable.uuid) {
      await qi.addColumn("members", "uuid", {
        type: DataTypes.UUID,
        allowNull: true,
        unique: true,
      });
    }

    const [users, members] = await Promise.all([
      User.findAll({ attributes: ["id", "uuid"] }),
      Member.findAll({ attributes: ["id", "uuid"] }),
    ]);

    for (const user of users) {
      if (!user.uuid) {
        await user.update({ uuid: crypto.randomUUID() });
      }
    }

    for (const member of members) {
      if (!member.uuid) {
        await member.update({ uuid: crypto.randomUUID() });
      }
    }

    console.log("UUID identifiers migration completed ✅");
  } catch (error) {
    console.error("UUID identifiers migration failed:", error);
  }
}
