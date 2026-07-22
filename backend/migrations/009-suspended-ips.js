import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const migration = async () => {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = "suspended_ips";

  const table = await queryInterface.describeTable(tableName).catch(() => null);
  if (table) return;

  await queryInterface.createTable(tableName, {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    ipAddress: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    reason: { type: DataTypes.STRING(255), allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    suspendedBy: { type: DataTypes.INTEGER, allowNull: true },
    suspendedByEmail: { type: DataTypes.STRING, allowNull: true },
    suspendedByName: { type: DataTypes.STRING, allowNull: true },
    expiresAt: { type: DataTypes.DATE, allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await queryInterface.addIndex(tableName, ["isActive"]);
  await queryInterface.addIndex(tableName, ["expiresAt"]);
};

export default migration;
