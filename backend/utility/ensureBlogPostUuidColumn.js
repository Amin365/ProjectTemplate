import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const ensureBlogPostUuidColumn = async () => {
  const qi = sequelize.getQueryInterface();

  try {
    const table = await qi.describeTable("blog_posts");

    if (!table.uuid) {
      await qi.addColumn("blog_posts", "uuid", {
        type: DataTypes.UUID,
        allowNull: true,
      });

      // Backfill existing records so new UUID-based links can be generated safely.
      await sequelize.query("UPDATE blog_posts SET uuid = UUID() WHERE uuid IS NULL");

      try {
        await qi.addIndex("blog_posts", ["uuid"], {
          unique: true,
          name: "blog_posts_uuid_unique",
        });
      } catch {
        // Ignore duplicate/index-state errors to keep startup idempotent.
      }

      console.log(" Ensured blog_posts.uuid exists");
    }
  } catch (error) {
    console.error(" Failed ensuring blog_posts.uuid column:", error?.message || error);
    throw error;
  }
};
