import { Op, col, fn, where } from "sequelize";
import User from "../models/user.js";

export const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

export const normalizeUsername = (value) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ");

export const usernameFromEmail = (email) => {
  const localPart = normalizeEmail(email).split("@")[0] || "";
  return localPart.replace(/[^a-z0-9._-]/gi, "").trim();
};

export const usernameFromName = (...parts) =>
  normalizeUsername(parts.filter(Boolean).join(" "));

export const buildUsernameCandidate = ({ username, fullName, firstName, middleName, lastName, email, fallback } = {}) => {
  return (
    normalizeUsername(username) ||
    usernameFromEmail(email) ||
    normalizeUsername(fullName) ||
    usernameFromName(firstName, middleName, lastName) ||
    normalizeUsername(fallback) ||
    `user${Date.now().toString().slice(-6)}`
  );
};

export const findUserByEmailOrUsername = (identifier) => {
  const normalized = normalizeEmail(identifier);
  return User.findOne({
    where: {
      [Op.or]: [
        where(fn("LOWER", col("email")), normalized),
        where(fn("LOWER", col("username")), normalized),
      ],
    },
  });
};

export const findUserByUsername = (username, excludeUserId = null) => {
  const normalized = normalizeUsername(username).toLowerCase();
  const clauses = [where(fn("LOWER", col("username")), normalized)];
  if (excludeUserId) clauses.push({ id: { [Op.ne]: Number(excludeUserId) } });
  return User.findOne({ where: { [Op.and]: clauses } });
};

export const ensureUniqueUsername = async (baseUsername, { suffixSeed } = {}) => {
  const base = normalizeUsername(baseUsername) || `user${Date.now().toString().slice(-6)}`;
  let candidate = base;
  let suffix = suffixSeed || Date.now().toString().slice(-4);
  let counter = 0;

  while (await findUserByUsername(candidate)) {
    counter += 1;
    candidate = `${base}-${suffix}${counter > 1 ? counter : ""}`;
  }

  return candidate;
};
