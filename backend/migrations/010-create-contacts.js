import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const migration = async () => {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = "contacts";

  const table = await queryInterface.describeTable(tableName).catch(() => null);
  if (table) return;

  await queryInterface.createTable(tableName, {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false },
    phone: { type: DataTypes.STRING(64), allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM('new','read'), allowNull: false, defaultValue: 'new' },
    meta: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await queryInterface.addIndex(tableName, ["status"]);
  await queryInterface.addIndex(tableName, ["createdAt"]);
};

export default migration;
