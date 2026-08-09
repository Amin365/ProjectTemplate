
import express from "express";
import dotenv from "dotenv";

import { ErrorHandle } from "./middleware/ErorHandle.js";
import { NotFound } from "./middleware/NotFound.js";
import seedAllModules from "./seeds/index.js";
import AuthRouter from "./routers/AuthRouter.js";
import cors from "cors";
import compression from "compression";
import RoleRouter from "./routers/RoleRouter.js";

import NotificationRouter from "./routers/NotificationRouter.js";

import UserRouter from "./routers/UserRouter.js";
import ContactRouter from "./routers/ContactRouter.js";

import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import { denyByDefaultApi } from "./middleware/securityPolicy.js";
import { blockSuspendedIp } from "./middleware/ipSuspension.js";

import path from "path";
import { fileURLToPath } from "url";

import DashboardRouter from "./routers/DashboardRouter.js";

// Phase 8 - Admin Governance and Safety
import AuditLogRouter from "./routers/AuditLogRouter.js";
import SystemHealthRouter from "./routers/SystemHealthRouter.js";

import sequelize from "./config/database.js";
import { runMigrations } from "./migrations/index.js";

import "./models/index.js";

import { validateSecurityConfig } from "./utility/validateSecurityConfig.js";
import { apiPerformanceMonitor } from "./utility/performanceMetrics.js";
import { ensureBlogPostUuidColumn } from "./utility/ensureBlogPostUuidColumn.js";

/* 
   FILE / DIRECTORY CONFIGURATION
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* 
   ENVIRONMENT VARIABLES
 */

dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log(
  "Loaded .env file from:",
  path.join(__dirname, ".env")
);

validateSecurityConfig();

/* 
   EXPRESS APP
 */

const app = express();

const PORT = process.env.PORT || 5000;

const isDev =
  process.env.NODE_ENV !== "production";

/* 
   TRUST RENDER PROXY
 */

app.set("trust proxy", 1);

/* 
   FRONTEND DIST PATH
 */

const frontendDistPath = path.resolve(
  __dirname,
  "../frontend/dist"
);

/* 
   SERVE PRODUCTION FRONTEND STATIC FILES
   IMPORTANT:
   This MUST come before XSS/HPP/API middleware so that
   /assets/*.js and /assets/*.css are served directly.
 */

if (process.env.NODE_ENV === "production") {
  console.log(
    "Serving frontend production build from:",
    frontendDistPath
  );

  app.use(
    express.static(frontendDistPath, {
      etag: true,
      lastModified: true,

      setHeaders: (res, filePath) => {
        /*
         * index.html should never be aggressively cached
         * because Vite generates hashed asset filenames.
         */
        if (filePath.endsWith(".html")) {
          res.setHeader(
            "Cache-Control",
            "no-cache, no-store, must-revalidate"
          );

          return;
        }

        /*
         * Vite assets contain hashes in their filenames,
         * therefore they can safely be cached.
         */
        if (
          filePath.includes(
            `${path.sep}assets${path.sep}`
          )
        ) {
          res.setHeader(
            "Cache-Control",
            "public, max-age=604800, immutable"
          );

          return;
        }

        res.setHeader(
          "Cache-Control",
          "public, max-age=3600"
        );
      },
    })
  );
}

/* 
   BODY PARSERS
 */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(compression());

/* 
   CORS
 */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://jjureadingclub.com",
  "https://projecttemplate-hb8m.onrender.com",
  "https://xaltech.tech/",
  "https://www.xaltech.tech/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      /*
       * Allow requests without Origin header.
       * Examples:
       * Postman
       * server-to-server requests
       */
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,
  })
);

/* 
   HELMET / CONTENT SECURITY POLICY
 */

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [
          "'self'",
        ],

        scriptSrc: [
          "'self'",
        ],

        styleSrc: [
          "'self'",
          "'unsafe-inline'",
        ],

        imgSrc: [
          "'self'",
          "data:",
          "https://res.cloudinary.com",
          "https://images.unsplash.com",
          "https://i.pravatar.cc",
        ],

        connectSrc: [
          "'self'",
          "https://jjureadingclub.com",
          "https://projecttemplate-hb8m.onrender.com",
        ],

        frameAncestors: [
          "'none'",
        ],
      },
    },
  })
);

/* 
   XSS PROTECTION
 */

app.use((req, res, next) => {
  /*
   * Blog posts may legitimately contain HTML.
   */
  if (
    req.path.startsWith("/api/blogposts")
  ) {
    return next();
  }

  /*
   * Production frontend assets should never go
   * through the XSS sanitizer.
   *
   * express.static above should normally already
   * handle them, but this gives an additional guard.
   */
  if (
    req.path.startsWith("/assets/")
  ) {
    return next();
  }

  return xss()(req, res, next);
});

/* 
   HTTP PARAMETER POLLUTION PROTECTION
 */

app.use(hpp());

/* 
   API PERFORMANCE MONITOR
 */

app.use(apiPerformanceMonitor());

/* 
   API SECURITY
 */

// Enforce admin-suspended IPs across all API endpoints.
app.use(
  "/api",
  blockSuspendedIp
);

// Deny-by-default API policy:
// only allow explicit public endpoints without auth.
app.use(
  "/api",
  denyByDefaultApi()
);

/* 
   API ROUTES
 */

app.use(
  "/api",
  AuthRouter
);

/*
 * Register moderator/static routes before dynamic routes
 * where necessary so paths such as:
 *
 * /api/members/unassigned
 *
 * are not accidentally captured by dynamic :id routes.
 */

app.use(
  "/api",
  RoleRouter
);

app.use(
  "/api",
  NotificationRouter
);

app.use(
  "/api",
  UserRouter
);

app.use(
  "/api",
  ContactRouter
);

app.use(
  "/api",
  DashboardRouter
);

// Phase 8 - Admin Governance and Safety

app.use(
  "/api",
  AuditLogRouter
);

app.use(
  "/api",
  SystemHealthRouter
);

/* 
   EMAIL HEALTH CHECK
 */

app.get(
  "/api/health/email",
  (req, res) => {
    return res.json({
      nodeEnv:
        process.env.NODE_ENV || null,

      resendKey:
        Boolean(
          process.env.RESEND_API_KEY
        ),

      emailFrom:
        process.env.EMAIL_FROM || null,

      emailFromName:
        process.env.EMAIL_FROM_NAME ||
        null,

      appUrl:
        process.env.APP_URL || null,
    });
  }
);

/* 
   DATABASE SYNC + MIGRATION + SEED
 */

app.post(
  "/sync-and-migration",
  async (req, res) => {
    try {
      const alterMode =
        process.env.NODE_ENV !==
        "production";

      await sequelize.sync({
        alter: alterMode,
        force: false,
      });

      await runMigrations();

      await seedAllModules();

      return res.json({
        success: true,

        message:
          "MySQL sync, migrations, and default seeding completed successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: true,

        message:
          `Migration failed: ${error.message}`,
      });
    }
  }
);

/* 
   DATABASE SEED ONLY
 */

app.post(
  "/db-alter/sync-seed",
  async (req, res) => {
    try {
      await seedAllModules();

      return res.json({
        success: true,

        message:
          "MySQL seeding completed successfully",
      });
    } catch (error) {
      console.error(
        "Database seeding error:",
        error
      );

      return res.status(500).json({
        error: true,

        message:
          `Seeding failed: ${error.message}`,
      });
    }
  }
);

/* 
   REACT / VITE SPA FALLBACK
 */

if (process.env.NODE_ENV === "production") {
  app.get(/.*/, (req, res, next) => {
    /*
     * Never serve index.html for API endpoints.
     */
    if (
      req.path === "/api" ||
      req.path.startsWith("/api/")
    ) {
      return next();
    }

    /*
     * If someone requests a missing asset,
     * do NOT return index.html.
     *
     * Returning index.html for a JS/CSS request
     * can create MIME-type/browser errors.
     */
    if (
      req.path.startsWith("/assets/")
    ) {
      return res.status(404).json({
        error: true,
        message:
          "Frontend asset not found",
        path: req.path,
      });
    }

    /*
     * React Router fallback.
     *
     * Examples:
     *
     * /
     * /login
     * /dashboard
     * /about
     * /services
     *
     * all receive frontend/dist/index.html.
     */
    return res.sendFile(
      path.join(
        frontendDistPath,
        "index.html"
      ),
      (error) => {
        if (error) {
          console.error(
            "Failed to send React index.html:",
            error
          );

          return next(error);
        }
      }
    );
  });
}

/* 
   NOT FOUND HANDLER
 */

app.use(NotFound);

/* 
   GLOBAL ERROR HANDLER
 */

app.use(ErrorHandle);

/* 
   DATABASE STARTUP SETTINGS
 */

const shouldSyncOnStart =
  isDev ||
  process.env.DB_SYNC_ON_START ===
    "true";

const shouldRunMigrationsOnStart =
  isDev ||
  process.env
    .RUN_MIGRATIONS_ON_START ===
    "true";

/* 
   START SERVER
 */

const startServer = async () => {
  try {
    /* -----------------------------------------------------
       TEST DATABASE CONNECTION
    ----------------------------------------------------- */

    await sequelize.authenticate();

    console.log(
      "Database connected"
    );

    /* -----------------------------------------------------
       OPTIONAL SEQUELIZE SYNC
    ----------------------------------------------------- */

    if (shouldSyncOnStart) {
      await sequelize.sync({
        alter: isDev,
        force: false,
      });

      console.log(
        "Sequelize schema sync completed"
      );
    }

    /* -----------------------------------------------------
       OPTIONAL MIGRATIONS
    ----------------------------------------------------- */

    if (
      shouldRunMigrationsOnStart
    ) {
      await runMigrations();

      console.log(
        "DB migrations completed"
      );
    }

    /* -----------------------------------------------------
       OPTIONAL BLOG UUID FIX
    ----------------------------------------------------- */

    // await ensureBlogPostUuidColumn();

    /* -----------------------------------------------------
       OPTIONAL SCHEDULERS
    ----------------------------------------------------- */

    // startIssueDueScheduler();

    // startDailyReportMissingScheduler();

    // startScheduledReporting();

    // startScheduledPublishing();

    /* -----------------------------------------------------
       START EXPRESS SERVER
    ----------------------------------------------------- */

    app.listen(
      PORT,
      () => {
        console.log(
          `Server running on port ${PORT}`
        );

        if (
          process.env.NODE_ENV ===
          "production"
        ) {
          console.log(
            `Frontend path: ${frontendDistPath}`
          );
        }
      }
    );
  } catch (error) {
    console.error(
      "MySQL FULL ERROR:"
    );

    console.error(error);

    process.exit(1);
  }
};

startServer();
