import sequelize from "../config/database.js";

const hasIndex = async (queryInterface, tableName, indexName) => {
  const indexes = await queryInterface.showIndex(tableName);
  return indexes.some((index) => index.name === indexName);
};

const ensureIndex = async (queryInterface, tableName, fields, indexName) => {
  if (await hasIndex(queryInterface, tableName, indexName)) {
    return;
  }

  await queryInterface.addIndex(tableName, fields, { name: indexName });
};

export default async function runPerformanceIndexesMigration() {
  try {
    const queryInterface = sequelize.getQueryInterface();

    await ensureIndex(
      queryInterface,
      "daily_reports",
      ["created_by", "readingDate"],
      "idx_daily_reports_created_by_readingDate"
    );
    await ensureIndex(
      queryInterface,
      "daily_reports",
      ["status", "readingDate"],
      "idx_daily_reports_status_readingDate"
    );

    await ensureIndex(
      queryInterface,
      "notifications",
      ["user_id", "read", "createdAt"],
      "idx_notifications_user_read_createdAt"
    );
    await ensureIndex(
      queryInterface,
      "notifications",
      ["user_id", "createdAt"],
      "idx_notifications_user_createdAt"
    );
    await ensureIndex(
      queryInterface,
      "notifications",
      ["expiresAt"],
      "idx_notifications_expiresAt"
    );

    await ensureIndex(
      queryInterface,
      "issues",
      ["member_id", "status", "returnDate"],
      "idx_issues_member_status_returnDate"
    );
    await ensureIndex(
      queryInterface,
      "issues",
      ["book_id", "status", "issueDate"],
      "idx_issues_book_status_issueDate"
    );

    console.log("Performance indexes migration completed ✅");
  } catch (error) {
    console.error("Performance indexes migration failed:", error);
  }
}
