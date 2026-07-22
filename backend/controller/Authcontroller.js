import dotenv from "dotenv";
dotenv.config();

import crypto from "crypto";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

import User from "../models/user.js";
import Role from "../models/Role.js";
import RolePermission from "../models/RolePermission.js";
import UserPermission from "../models/UserPermission.js";
import Permission from "../models/Permissions.js";
import RefreshToken from "../models/RefreshToken.js";

import {
  signAccessToken,
  signRefreshToken,
  hashToken,
  verifyRefreshToken,
} from "../utility/tokenUtils.js";
import { logAuthAction } from "../utility/auditLog.js";
import { sendMail, buildEmailHtml } from "./EmailController.js";
import { sanitizeOutput } from "../utility/responseSanitizers.js";
import { encryptSensitive } from "../utility/dataProtection.js";
import {
  buildUsernameCandidate,
  ensureUniqueUsername,
  findUserByEmailOrUsername,
  normalizeEmail,
} from "../utility/usernames.js";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    let retryAfterMinutes = 1;
    if (req.rateLimit?.resetTime) {
      retryAfterMinutes = Math.ceil((req.rateLimit.resetTime - Date.now()) / 60000);
      if (retryAfterMinutes < 1) retryAfterMinutes = 1;
    }
    return res.status(429).json({
      error: true,
      message: `Too many login attempts. Try again in ${retryAfterMinutes} minute${
        retryAfterMinutes > 1 ? "s" : ""
      }.`,
    });
  },
});

export const registerUser = async (req, res) => {
  const { username, email, password, first_name, last_name, fullName } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }

  try {
    const normalizedEmail = normalizeEmail(email);
    const nameParts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
    const resolvedFirstName = String(first_name || nameParts[0] || normalizedEmail.split("@")[0] || "User").trim();
    const resolvedLastName = String(last_name || (nameParts.length > 1 ? nameParts.slice(1).join(" ") : "-")).trim();
    const normalizedPassword = String(password);

    const userExists = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const normalizedUsername = await ensureUniqueUsername(
      buildUsernameCandidate({
        username,
        fullName,
        firstName: resolvedFirstName,
        lastName: resolvedLastName,
        email: normalizedEmail,
      })
    );

    const user = await User.create({
      first_name: resolvedFirstName,
      last_name: resolvedLastName,
      username: normalizedUsername,
      email: normalizedEmail,
      // password hashing should be handled in model hook
      password: normalizedPassword,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
    });
  } catch (error) {
    console.error("registerUser error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, username, identifier, password } = req.body;

  const id = String(identifier || email || username || "")
    .trim()
    .toLowerCase();
  const normalizedPassword = String(password || "").trim();

  const rateLimitRemaining = req.rateLimit ? req.rateLimit.remaining : "unknown";

  if (!id || !normalizedPassword) {
    return res.status(400).json({
      message: "identifier (email or username) and password are required",
    });
  }

  try {
    const user = await findUserByEmailOrUsername(id);

    if (!user) {
      return res.status(401).json({
        message:
          "Incorrect Credentials." +
          (rateLimitRemaining !== "unknown"
            ? ` ( ${rateLimitRemaining} attempts left )`
            : ""),
      });
    }

    if (user.lockUntil && new Date(user.lockUntil).getTime() > Date.now()) {
      const retrySeconds = Math.ceil((new Date(user.lockUntil).getTime() - Date.now()) / 1000);
      return res.status(423).json({
        message: `Account temporarily locked due to failed attempts. Try again in ${retrySeconds}s.`,
      });
    }

    if (user.status && user.status !== "Active") {
      return res
        .status(403)
        .json({ message: "Account is not active. Please contact support." });
    }

    const isMatch = await bcrypt.compare(normalizedPassword, user.password);
    if (!isMatch) {
      const failed = Number(user.failedLoginAttempts || 0) + 1;
      const nextUpdate = { failedLoginAttempts: failed };
      if (failed >= 5) {
        nextUpdate.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      await user.update(nextUpdate);

      return res.status(401).json({
        message:
          "Incorrect Credentials." +
          (rateLimitRemaining !== "unknown"
            ? ` ( ${rateLimitRemaining} attempts left )`
            : ""),
      });
    }

    if (user.failedLoginAttempts || user.lockUntil) {
      await user.update({ failedLoginAttempts: 0, lockUntil: null });
    }

    const roleDoc = user.role_id ? await Role.findByPk(user.role_id) : null;

    const [rolePermDocs, userPermDocs] = await Promise.all([
      roleDoc
        ? RolePermission.findAll({
            where: { role_id: roleDoc.id },
            attributes: ["permission_id"],
            raw: true,
          })
        : [],
      UserPermission.findAll({
        where: { user_id: user.id },
        attributes: ["permission_id"],
        raw: true,
      }),
    ]);

    const permissionIds = [
      ...new Set(
        [...rolePermDocs.map((rp) => rp.permission_id), ...userPermDocs.map((up) => up.permission_id)].filter(
          Boolean
        )
      ),
    ];

    const permissionDocs = permissionIds.length
      ? await Permission.findAll({
          where: { id: { [Op.in]: permissionIds } },
          attributes: ["permission"],
          raw: true,
        })
      : [];

    const permissionSet = new Set(permissionDocs.map((p) => p.permission).filter(Boolean));

    const payload = { id: user.id, role: user.role_id || null };

    const currentUserAgent = req.get("User-Agent") || "unknown";
    const knownSession = await RefreshToken.findOne({
      where: {
        user_id: user.id,
        revoked: false,
        ip: req.ip,
        userAgent: currentUserAgent,
      },
    });
    const hasPriorSession = await RefreshToken.findOne({ where: { user_id: user.id } });
    if (!knownSession && hasPriorSession) {
      await logAuthAction("login_anomaly", user, req, {
        description: `New login fingerprint detected for user "${user.email}"`,
        ip: req.ip,
        userAgent: currentUserAgent,
      });
    }

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const tokenHash = hashToken(refreshToken);
    const decodedRefresh = verifyRefreshToken(refreshToken);
    const expiresAt = new Date(decodedRefresh.exp * 1000);

    await RefreshToken.create({
      tokenHash,
      user_id: user.id,
      expiresAt,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    await user.update({
      lastLoginIp: encryptSensitive(req.ip),
      lastLoginUserAgent: encryptSensitive(req.get("User-Agent") || null),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
      maxAge: Math.max(0, expiresAt.getTime() - Date.now()),
    });

    await logAuthAction("login", user, req, {
      description: `User "${user.email}" logged in successfully`,
    });

    return res.json({
      token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        status: user.status,
        role: roleDoc ? { id: roleDoc.id, role: roleDoc.role } : null,
        permissions: Array.from(permissionSet),
        mustChangePassword: user.mustChangePassword || false,
      },
    });
  } catch (error) {
    console.error("loginUser error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const tokenHash = hashToken(token);
    const stored = await RefreshToken.findOne({ where: { tokenHash } });

    if (!stored) {
      return res.status(401).json({ message: "Refresh token revoked or not found" });
    }

    if (stored.revoked) {
      await RefreshToken.update({ revoked: true }, { where: { user_id: payload.id, revoked: false } });

      const user = await User.findByPk(payload.id);
      if (user) {
        await logAuthAction("refresh_reuse_detected", user, req, {
          description: `Refresh token reuse detected for user \"${user.email}\". All sessions revoked.`,
        });
      }

      return res.status(401).json({ message: "Refresh token reuse detected; sessions revoked" });
    }

    if (stored.expiresAt.getTime() < Date.now()) {
      return res.status(401).json({ message: "Refresh token expired" });
    }

    const newPayload = { id: payload.id, role: payload.role || null };
    const newAccessToken = signAccessToken(newPayload);
    const newRefreshToken = signRefreshToken(newPayload);

    const newTokenHash = hashToken(newRefreshToken);
    const newDecoded = verifyRefreshToken(newRefreshToken);
    const newExpiresAt = new Date(newDecoded.exp * 1000);

    stored.revoked = true;
    stored.replacedByTokenHash = newTokenHash;
    await stored.save();

    await RefreshToken.create({
      tokenHash: newTokenHash,
      user_id: stored.user_id,
      expiresAt: newExpiresAt,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
      maxAge: Math.max(0, newExpiresAt.getTime() - Date.now()),
    });

    return res.json({ token: newAccessToken });
  } catch (err) {
    console.error("refreshToken error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      const tokenHash = hashToken(token);
      await RefreshToken.update({ revoked: true }, { where: { tokenHash } });
    }

    res.clearCookie("refreshToken", { path: "/api/auth" });
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const GetProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const roleDoc = user.role_id ? await Role.findByPk(user.role_id) : null;
    const effectivePermissions = Array.isArray(req.user?.permissions)
      ? req.user.permissions
      : [];

    return res.json({
      success: true,
      user: sanitizeOutput({
        ...user.toJSON(),
        role: roleDoc ? { id: roleDoc.id, role: roleDoc.role } : null,
        permissions: effectivePermissions,
        roleInfo: roleDoc ? roleDoc.toJSON() : null,
      }),
    });
  } catch (err) {
    return next(err);
  }
};

export const validateInviteToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const tokenHash = hashToken(token);
    const user = await User.findOne({
      where: {
        inviteToken: tokenHash,
        inviteTokenExpires: { [Op.gt]: new Date() },
      },
      attributes: ["first_name", "last_name", "email", "inviteTokenExpires"],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired invite token" });
    }

    return res.json({
      valid: true,
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        expiresAt: user.inviteTokenExpires,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const setupPasswordFromInvite = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (!password || String(password).length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const tokenHash = hashToken(token);
    const user = await User.findOne({
      where: {
        inviteToken: tokenHash,
        inviteTokenExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired invite token" });
    }

    user.password = password;
    user.status = "Active";
    user.mustChangePassword = false;
    user.inviteToken = null;
    user.inviteTokenExpires = null;

    await user.save();

    return res.json({
      success: true,
      message: "Password set successfully. You can now log in.",
    });
  } catch (err) {
    return next(err);
  }
};

export const resendInvite = async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({
      where: { email, mustChangePassword: true },
    });

    if (!user) {
      return res.status(404).json({ message: "No pending invite found for this email" });
    }

    const inviteToken = crypto.randomBytes(32).toString("hex");
    const inviteTokenExpires = new Date(Date.now() + 72 * 60 * 60 * 1000);

    user.inviteToken = hashToken(inviteToken);
    user.inviteTokenExpires = inviteTokenExpires;
    await user.save();

    const appUrl = process.env.APP_URL || "http://localhost:5173";
    const setupUrl = `${appUrl}/setup-password?token=${inviteToken}`;

    await sendMail({
      to: user.email,
      subject: "Set up your account - Reminder",
      html: buildEmailHtml({
        title: "Complete Your Account Setup",
        preheader: "Set up your account password",
        greeting: `Hello ${user.first_name || "there"}`,
        bodyLines: [
          "This is a reminder to set up your JJU Reading Club account.",
          "Please click the button below to set up your password.",
          "This link will expire in 72 hours.",
        ],
        ctaLabel: "Set Up Password",
        ctaUrl: setupUrl,
        footerNote: "If you didn't expect this email, you can safely ignore it.",
      }),
    });

    return res.json({
      success: true,
      message: "Invite email has been resent",
    });
  } catch (err) {
    return next(err);
  }
};

export const checkMustChangePassword = async (req, res, next) => {
  try {
    if (req.user?.mustChangePassword) {
      return res.status(403).json({
        message: "Password change required",
        mustChangePassword: true,
      });
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

export default {
  loginLimiter,
  registerUser,
  loginUser,
  refreshToken,
  logout,
  GetProfile,
  validateInviteToken,
  setupPasswordFromInvite,
  resendInvite,
  checkMustChangePassword,
};
