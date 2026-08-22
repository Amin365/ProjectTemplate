import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const migration = async () => {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = "contacts";

  const table = await queryInterface.describeTable(tableName).catch(() => null);
  if (!table) return;

  const addIfMissing = async (column, definition) => {
    if (!table[column]) {
      await queryInterface.addColumn(tableName, column, definition);
    }
  };

  await addIfMissing("requestType", {
    type: DataTypes.ENUM("general", "school_demo"),
    allowNull: false,
    defaultValue: "general",
  });

  await addIfMissing("schoolName", {
    type: DataTypes.STRING(255),
    allowNull: true,
  });

  await addIfMissing("schoolRole", {
    type: DataTypes.STRING(120),
    allowNull: true,
  });

  await addIfMissing("schoolLocation", {
    type: DataTypes.STRING(255),
    allowNull: true,
  });

  await addIfMissing("studentCount", {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  });

  await addIfMissing("preferredDemoTime", {
    type: DataTypes.STRING(120),
    allowNull: true,
  });

  await addIfMissing("source", {
    type: DataTypes.STRING(80),
    allowNull: false,
    defaultValue: "xaltech_web",
  });
};

export default migration;
