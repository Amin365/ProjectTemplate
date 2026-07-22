import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const toIntOr = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: toIntOr(process.env.DB_CONNECT_TIMEOUT_MS, 10000),
    },
    pool: {
      max: toIntOr(process.env.DB_POOL_MAX, 20),
      min: toIntOr(process.env.DB_POOL_MIN, 5),
      acquire: toIntOr(process.env.DB_POOL_ACQUIRE_MS, 30000),
      idle: toIntOr(process.env.DB_POOL_IDLE_MS, 10000),
      evict: toIntOr(process.env.DB_POOL_EVICT_MS, 1000),
    },
  }
);

export default sequelize;