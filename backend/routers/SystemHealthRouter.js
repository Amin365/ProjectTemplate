/**
 * Phase 8 - System Health Router
 * Admin-only routes for monitoring system health
 */

import express from "express";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import { apiLimiter } from "../utility/rateLimiter.js";
import { responseCache } from "../middleware/responseCache.js";
import {
  getSystemHealth,
  getNotificationHealth,
  getJobStatus,
  getDatabaseStats,
  getRecentErrors,
  getSystemSummary,
  getApiPerformance,
} from "../controller/SystemHealthController.js";

const SystemHealthRouter = express.Router();

// All system health routes require authentication and admin role
const adminOnly = [protect, requireRole(["Super Admin", "Admin"])];
const systemHealthCache = responseCache(Number.parseInt(process.env.SYSTEM_HEALTH_CACHE_TTL_MS || "30000", 10));

// Get system summary for dashboard
SystemHealthRouter.get("/system-health/summary", adminOnly, apiLimiter, systemHealthCache, getSystemSummary);

// Get overall system health
SystemHealthRouter.get("/system-health", adminOnly, apiLimiter, systemHealthCache, getSystemHealth);

// Get notification health stats
SystemHealthRouter.get("/system-health/notifications", adminOnly, apiLimiter, systemHealthCache, getNotificationHealth);

// Get scheduled job status
SystemHealthRouter.get("/system-health/jobs", adminOnly, apiLimiter, systemHealthCache, getJobStatus);

// Get database statistics
SystemHealthRouter.get("/system-health/database", adminOnly, apiLimiter, systemHealthCache, getDatabaseStats);

// Get recent errors
SystemHealthRouter.get("/system-health/errors", adminOnly, apiLimiter, systemHealthCache, getRecentErrors);

// Get API request performance snapshot
SystemHealthRouter.get("/system-health/performance", adminOnly, apiLimiter, systemHealthCache, getApiPerformance);

export default SystemHealthRouter;
