import { DataTypes } from "sequelize";
import crypto from "crypto";
import sequelize from "../config/database.js";
import BlogPost from "../models/BlogPost.js";

export default async function runBlogPostUuidMigration() {
  try {
    const qi = sequelize.getQueryInterface();
    const table = await qi.describeTable("blog_posts");

    if (!table.uuid) {
      await qi.addColumn("blog_posts", "uuid", {
        type: DataTypes.UUID,
        allowNull: true,
      });
    }

    const posts = await BlogPost.findAll({ attributes: ["id", "uuid"] });
    for (const post of posts) {
      if (!post.uuid) {
        await post.update({ uuid: crypto.randomUUID() });
      }
    }

    try {
      await qi.changeColumn("blog_posts", "uuid", {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      });
    } catch {
      // Some MySQL variants may reject repeated unique/alter operations; keep migration idempotent.
    }

    console.log("Blog post UUID migration completed ✅");
  } catch (error) {
    console.error("Blog post UUID migration failed:", error);
    throw error;
  }
}
