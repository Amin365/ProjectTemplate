import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SuspendedIp = sequelize.define(
  "SuspendedIp",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ipAddress: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    reason: { type: DataTypes.STRING(255), allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    suspendedBy: { type: DataTypes.INTEGER, allowNull: true },
    suspendedByEmail: { type: DataTypes.STRING, allowNull: true },
    suspendedByName: { type: DataTypes.STRING, allowNull: true },
    expiresAt: { type: DataTypes.DATE, allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
  },
  {
    tableName: "suspended_ips",
    timestamps: true,
    indexes: [
      { fields: ["ipAddress"], unique: true },
      { fields: ["isActive"] },
      { fields: ["expiresAt"] },
    ],
  }
);

export default SuspendedIp;
