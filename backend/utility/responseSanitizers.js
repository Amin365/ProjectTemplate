const SENSITIVE_KEYS = new Set([
  "password",
  "resetPasswordCode",
  "resetPasswordExpires",
  "inviteToken",
  "inviteTokenExpires",
  "failedLoginAttempts",
  "lockUntil",
  "lastLoginIp",
  "lastLoginUserAgent",
  "added_by",
  "updated_by",
  "invited_by",
  "lastPasswordChange",
  "passwordChangedCount",
]);

const sanitizeObject = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeObject);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const plain = typeof value.toJSON === "function" ? value.toJSON() : value;
  const result = {};

  for (const [key, val] of Object.entries(plain)) {
    if (SENSITIVE_KEYS.has(key)) continue;
    result[key] = sanitizeObject(val);
  }

  return result;
};

export const sanitizeOutput = (payload) => sanitizeObject(payload);
