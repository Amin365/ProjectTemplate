/**
 * Phase 8 - System Health Controller
 * Provides endpoints for monitoring system health, failed jobs, and queue status
 */

import Notification from "../models/Notification.js";
import sequelize from "../config/database.js";
import { Op, col, fn, QueryTypes, where as sqlWhere } from "sequelize";
import User from "../models/user.js";
import AuditLog from "../models/AuditLog.js";

import { getApiPerformanceSnapshot } from "../utility/performanceMetrics.js";

// Track scheduled job status in memory
const jobStatus = {
  issueDueScheduler: {
    name: "Issue Due Scheduler",
    lastRun: null,
    status: "unknown",
    errors: [],
  },
  dailyReportMissingScheduler: {
    name: "Daily Report Missing Scheduler",
    lastRun: null,
    status: "unknown",
    errors: [],
  },
  scheduledReporting: {
    name: "Scheduled Reporting",
    lastRun: null,
    status: "unknown",
    errors: [],
  },
  scheduledPublishing: {
    name: "Scheduled Publishing",
    lastRun: null,
    status: "unknown",
    errors: [],
  },
};

const hasAnyPermission = (req, perms = []) => {
  const userPerms = new Set((req.user?.permissions || []).map((p) => String(p).toLowerCase()));
  return perms.some((p) => userPerms.has(String(p).toLowerCase()));
};

const canAccessSystemHealth = (req) => {
  const roleName = String(req.user?.role?.role || req.user?.role?.plural || req.user?.role || "").toLowerCase();
  if (/super\s*admin/i.test(roleName) || /admin/i.test(roleName)) return true;
  return hasAnyPermission(req, ["View Role", "Edit Role", "Delete Role"]);
};

/**
 * Update job status (called from scheduler modules)
 * @param {string} jobName - Name of the job
 * @param {string} status - 'success', 'error', 'running'
 * @param {string} error - Error message if status is 'error'
 */
export function updateJobStatus(jobName, status, error = null) {
  if (jobStatus[jobName]) {
    jobStatus[jobName].lastRun = new Date();
    jobStatus[jobName].status = status;

    if (error) {
      jobStatus[jobName].errors.unshift({
        message: error,
        timestamp: new Date(),
      });

      if (jobStatus[jobName].errors.length > 10) {
        jobStatus[jobName].errors = jobStatus[jobName].errors.slice(0, 10);
      }
    } else if (status === "success") {
      jobStatus[jobName].errors = [];
    }
  }
}

/**
 * GET /system-health
 */
export const getSystemHealth = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canAccessSystemHealth(req)) return res.status(403).json({ message: "Access denied" });

    const health = {
      status: "healthy",
      timestamp: new Date(),
      checks: {},
      unhealthyReasons: [],
    };

    let dbConnected = true;
    try {
      await sequelize.authenticate();
    } catch {
      dbConnected = false;
    }

    health.checks.database = {
      name: "MySQL",
      status: dbConnected ? "connected" : "disconnected",
      healthy: dbConnected,
    };

    // Align with runtime config: DB settings have sane defaults in config/database.js.
    const requiredEnvVars = ["JWT_SECRET"];
    const optionalEnvVars = [
      "RESEND_API_KEY",
      "VAPID_PUBLIC_KEY",
      "VAPID_PRIVATE_KEY",
      "CLOUDINARY_CLOUD_NAME",
    ];

    const missingRequired = requiredEnvVars.filter((v) => !process.env[v]);
    const missingOptional = optionalEnvVars.filter((v) => !process.env[v]);

    health.checks.environment = {
      name: "Environment Variables",
      status: missingRequired.length === 0 ? "configured" : "missing required",
      healthy: missingRequired.length === 0,
      details: { missingRequired, missingOptional },
    };

    health.checks.email = {
      name: "Email Service",
      status: process.env.RESEND_API_KEY ? "configured" : "not configured",
      healthy: true,
    };

    health.checks.push = {
      name: "Push Notifications",
      status:
        process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY
          ? "configured"
          : "not configured",
      healthy: true,
    };

    health.checks.scheduledJobs = {
      name: "Scheduled Jobs",
      status: "running",
      healthy: true,
      jobs: { ...jobStatus },
    };

    const criticalChecks = ["database", "environment"];
    const unhealthy = criticalChecks.filter((c) => !health.checks[c]?.healthy);
    if (unhealthy.length > 0) {
      health.status = "unhealthy";
      if (!health.checks.database?.healthy) {
        health.unhealthyReasons.push("Database connection failed");
      }
      if (!health.checks.environment?.healthy) {
        const missing = health.checks.environment?.details?.missingRequired || [];
        health.unhealthyReasons.push(
          missing.length
            ? `Missing required env vars: ${missing.join(", ")}`
            : "Environment not fully configured"
        );
      }
    }

    return res.status(200).json({ data: health });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /system-health/notifications
 */
export const getNotificationHealth = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canAccessSystemHealth(req)) return res.status(403).json({ message: "Access denied" });

    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days, 10));

    const where = { createdAt: { [Op.gte]: startDate } };

    const groupedStats = await Notification.findAll({
      where,
      attributes: ["type", "read", [fn("COUNT", col("id")), "count"]],
      group: ["type", "read"],
      raw: true,
    });

    const notificationStats = groupedStats.map((row) => ({
      _id: { type: row.type, read: !!row.read },
      count: Number(row.count || 0),
    }));

    const totalNotifications = await Notification.count({ where });

    const unreadNotifications = await Notification.count({
      where: { ...where, read: false },
    });

    const dailyRows = await Notification.findAll({
      where,
      attributes: [
        [fn("DATE_FORMAT", col("createdAt"), "%Y-%m-%d"), "day"],
        [fn("COUNT", col("id")), "count"],
      ],
      group: [fn("DATE_FORMAT", col("createdAt"), "%Y-%m-%d")],
      order: [[fn("DATE_FORMAT", col("createdAt"), "%Y-%m-%d"), "ASC"]],
      raw: true,
    });

    const dailyNotifications = dailyRows.map((row) => ({
      _id: row.day,
      count: Number(row.count || 0),
    }));

    return res.status(200).json({
      data: {
        totalNotifications,
        unreadNotifications,
        notificationStats,
        dailyNotifications,
        period: parseInt(days, 10),
      },
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /system-health/jobs
 */
export const getJobStatus = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canAccessSystemHealth(req)) return res.status(403).json({ message: "Access denied" });

    return res.status(200).json({
      data: {
        jobs: Object.entries(jobStatus).map(([key, value]) => ({
          _id: key,
          ...value,
        })),
      },
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /system-health/database
 */
export const getDatabaseStats = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canAccessSystemHealth(req)) return res.status(403).json({ message: "Access denied" });

    const modelEntries = Object.entries(sequelize.models);

    const stats = await Promise.all(
      modelEntries.map(async ([modelName, model]) => ({
        name: model?.getTableName?.() || modelName,
        documentCount: await model.count(),
      }))
    );

    stats.sort((a, b) => b.documentCount - a.documentCount);

    const sizeRows = await sequelize.query(
      `
      SELECT
        IFNULL(SUM(data_length), 0) AS dataSize,
        IFNULL(SUM(index_length), 0) AS indexSize,
        IFNULL(SUM(data_length + index_length), 0) AS storageSize,
        COUNT(*) AS tableCount
      FROM information_schema.TABLES
      WHERE table_schema = DATABASE()
      `,
      { type: QueryTypes.SELECT }
    );

    const dbStats = sizeRows?.[0] || {};

    return res.status(200).json({
      data: {
        collections: stats,
        totalCollections: Number(dbStats.tableCount || stats.length),
        totalDocuments: stats.reduce((sum, s) => sum + s.documentCount, 0),
        dataSize: Number(dbStats.dataSize || 0),
        storageSize: Number(dbStats.storageSize || 0),
        indexes: null,
        indexSize: Number(dbStats.indexSize || 0),
      },
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /system-health/errors
 */
export const getRecentErrors = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canAccessSystemHealth(req)) return res.status(403).json({ message: "Access denied" });

    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days, 10));

    const failedLogins = await AuditLog.count({
      where: {
        action: "auth.failed_login",
        createdAt: { [Op.gte]: startDate },
      },
    });

    const errorActions = await AuditLog.findAll({
      where: {
        createdAt: { [Op.gte]: startDate },
        [Op.or]: [
          sqlWhere(fn("LOWER", col("action")), { [Op.like]: "%error%" }),
          sqlWhere(fn("LOWER", col("action")), { [Op.like]: "%failed%" }),
          sqlWhere(fn("LOWER", col("action")), { [Op.like]: "%rejected%" }),
        ],
      },
      order: [["createdAt", "DESC"]],
      limit: 50,
    });

    return res.status(200).json({
      data: {
        failedLogins,
        recentErrors: errorActions,
        period: parseInt(days, 10),
      },
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /system-health/summary
 */
export const getSystemSummary = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canAccessSystemHealth(req)) return res.status(403).json({ message: "Access denied" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalUsers, activeUsers, todayAuditLogs, pendingNotifications] =
      await Promise.all([
        User.count(),
        User.count({ where: { status: "Active" } }),
        AuditLog.count({ where: { createdAt: { [Op.gte]: today } } }),
        Notification.count({ where: { read: false } }),
      ]);

    let dbStatus = "connected";
    try {
      await sequelize.authenticate();
    } catch {
      dbStatus = "disconnected";
    }

    return res.status(200).json({
      data: {
        database: dbStatus,
        totalUsers,
        activeUsers,
        todayAuditLogs,
        pendingNotifications,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
      },
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /system-health/performance
 */
export const getApiPerformance = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canAccessSystemHealth(req)) return res.status(403).json({ message: "Access denied" });

    const snapshot = getApiPerformanceSnapshot();
    return res.status(200).json({ data: snapshot });
  } catch (err) {
    return next(err);
  }
};

export default {
  getSystemHealth,
  getNotificationHealth,
  getJobStatus,
  getDatabaseStats,
  getRecentErrors,
  getSystemSummary,
  getApiPerformance,
  updateJobStatus,
};