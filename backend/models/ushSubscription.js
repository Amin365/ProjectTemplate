import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PushSubscription = sequelize.define('PushSubscription', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  subscription: { type: DataTypes.JSON, allowNull: false },
}, { tableName: 'push_subscriptions', timestamps: true });

export default PushSubscription;
