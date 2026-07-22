import express from "express"
import dotenv from "dotenv"

import { ErrorHandle } from "./middleware/ErorHandle.js"
import { NotFound } from "./middleware/NotFound.js"
import seedAllModules from "./seeds/index.js"
import AuthRouter from "./routers/AuthRouter.js"
import cors from 'cors'
import compression from "compression";
import RoleRouter from "./routers/RoleRouter.js"

import NotificationRouter from "./routers/NotificationRouter.js"

import UserRouter from "./routers/UserRouter.js"

import helmet from "helmet";
import {xss} from "express-xss-sanitizer";
import hpp from 'hpp'
import cookieParser from "cookie-parser";
import { denyByDefaultApi } from "./middleware/securityPolicy.js";
import { blockSuspendedIp } from "./middleware/ipSuspension.js";

import path from 'path'
import { fileURLToPath } from "url";  

import DashboardRouter from "./routers/DashboardRouter.js"

// Phase 8 - Admin Governance and Safety
import AuditLogRouter from './routers/AuditLogRouter.js';
import SystemHealthRouter from './routers/SystemHealthRouter.js';
import sequelize from "./config/database.js";
import { runMigrations } from "./migrations/index.js";
import "./models/index.js";
import { validateSecurityConfig } from "./utility/validateSecurityConfig.js";
import { apiPerformanceMonitor } from "./utility/performanceMetrics.js";
import { ensureBlogPostUuidColumn } from "./utility/ensureBlogPostUuidColumn.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });
console.log("Loaded .env file from:", path.join(__dirname, ".env"));
validateSecurityConfig();
const app = express()
const PORT = process.env.PORT || 5000
const isDev = process.env.NODE_ENV !== 'production';
app.set("trust proxy", 1);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());



const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://jjureadingclub.com" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, server-side requests

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://images.unsplash.com", "https://i.pravatar.cc"],
        connectSrc: ["'self'", "https://jjureadingclub.com"], // allow API calls
        frameAncestors: ["'none'"],
      },
    },
  })
);

app.use((req, res, next) => {
  if (req.path.startsWith("/api/blogposts")) return next();
  return xss()(req, res, next);
});
app.use(hpp());
app.use(apiPerformanceMonitor());

// Enforce admin-suspended IPs across all API endpoints.
app.use('/api', blockSuspendedIp);

// Deny-by-default API policy: only allow explicit public endpoints without auth.
app.use('/api', denyByDefaultApi());




app.use('/api',AuthRouter)


// Register moderator routes before member routes so static paths like
// `/api/members/unassigned` handled by ModeratorRouter instead of being
// captured by MemberRouter's dynamic `:id` param.

app.use("/api", RoleRouter);


app.use('/api',NotificationRouter)
app.use('/api',UserRouter)

app.use('/api',DashboardRouter)

// Phase 8 - Admin Governance and Safety
app.use('/api', AuditLogRouter);
app.use('/api', SystemHealthRouter);

app.get("/api/health/email", (req, res) => {
  return res.json({
    nodeEnv: process.env.NODE_ENV || null,
    resendKey: Boolean(process.env.RESEND_API_KEY),
    emailFrom: process.env.EMAIL_FROM || null,
    emailFromName: process.env.EMAIL_FROM_NAME || null,
    appUrl: process.env.APP_URL || null,
  });
});

app.post("/sync-and-migration", async (req, res) => {
  try {
    const alterMode = process.env.NODE_ENV !== 'production';
    await sequelize.sync({ alter: alterMode, force: false });
    await runMigrations();
    await seedAllModules();

    return res.json({
      success: true,
      message: "MySQL sync, migrations, and default seeding completed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: `Migration failed: ${error.message}`,
    });
  }
});



app.post("/db-alter/sync-seed", async (req, res) => {
  try {
    await seedAllModules();

    return res.json({
      success: true,
      message: "MySQL seeding completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `Seeding failed: ${error.message}`,
    });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(path.join(__dirname, '../frontend/dist'), {
      maxAge: "7d",
      immutable: true,
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
          return;
        }
        res.setHeader("Cache-Control", "public, max-age=604800, immutable");
      },
    })
  );

  app.get(/.*/, (req, res, next) => {
    if (req.path === '/api' || req.path.startsWith('/api/')) {
      return next();
    }

    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}



app.use(NotFound)
app.use(ErrorHandle);


const shouldSyncOnStart = isDev || process.env.DB_SYNC_ON_START === "true";
const shouldRunMigrationsOnStart = isDev || process.env.RUN_MIGRATIONS_ON_START === "true";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database connected");

    if (shouldSyncOnStart) {
      await sequelize.sync({ alter: isDev, force: false });
      console.log(" Sequelize schema sync completed");
    }

    if (shouldRunMigrationsOnStart) {
      await runMigrations();
      console.log(" DB migrations completed");
    }

    // await ensureBlogPostUuidColumn();

    // startIssueDueScheduler();
    // startDailyReportMissingScheduler();
    // startScheduledReporting();
    // startScheduledPublishing();

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" MySQL FULL ERROR:");
    console.error(error);
    process.exit(1);
  }
};

startServer();