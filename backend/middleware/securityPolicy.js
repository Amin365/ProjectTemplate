import { verifyAccessToken } from "../utility/tokenUtils.js";

const defaultPublicRules = [
  { method: "POST", pattern: /^\/auth\/register$/i },
  { method: "POST", pattern: /^\/auth\/login$/i },
  { method: "POST", pattern: /^\/auth\/refresh$/i },
  { method: "POST", pattern: /^\/auth\/logout$/i },
  { method: "GET", pattern: /^\/auth\/validate-invite\/.+/i },
  { method: "POST", pattern: /^\/auth\/setup-password$/i },
  { method: "POST", pattern: /^\/auth\/resend-invite$/i },
  { method: "POST", pattern: /^\/forgot-password$/i },
  { method: "POST", pattern: /^\/reset-password$/i },
  { method: "POST", pattern: /^\/resend-reset-code$/i },
  { method: "POST", pattern: /^\/verify-reset-code$/i },
  { method: "POST", pattern: /^\/members$/i },
  { method: "POST", pattern: /^\/join-club$/i },
  { method: "GET", pattern: /^\/health\/email$/i },
  { method: "GET", pattern: /^\/share\/blog\/.+/i },
  { method: "GET", pattern: /^\/blogposts$/i },
  { method: "GET", pattern: /^\/blogposts\/featured$/i },
  { method: "GET", pattern: /^\/blogposts\/[^/]+$/i },
  { method: "GET", pattern: /^\/blogposts\/[^/]+\/comments$/i },
  { method: "POST", pattern: /^\/blogposts\/[^/]+\/views$/i },
  { method: "GET", pattern: /^\/resources\/[^/]+$/i },
];

const isPublicRequest = (req, rules) => {
  const method = String(req.method || "").toUpperCase();
  const path = String(req.path || "");
  return rules.some((rule) => rule.method === method && rule.pattern.test(path));
};

export const denyByDefaultApi = (rules = defaultPublicRules) => (req, res, next) => {
  if (isPublicRequest(req, rules)) {
    return next();
  }

  const authHeader = req.headers.authorization || "";
  const parts = authHeader.split(" ");
  const token = parts.length === 2 && /^Bearer$/i.test(parts[0]) ? parts[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required by security policy" });
  }

  try {
    verifyAccessToken(token);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};
