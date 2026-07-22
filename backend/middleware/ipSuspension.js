import { Op } from "sequelize";
import SuspendedIp from "../models/SuspendedIp.js";
import { ensureSuspendedIpTable } from "../utility/ensureSuspendedIpTable.js";

const normalizeIp = (rawIp) => {
  const value = String(rawIp || "").trim();
  if (!value) return "";

  // Keep first forwarded IP when multiple are present.
  const first = value.split(",")[0].trim();

  if (first.startsWith("::ffff:")) {
    return first.slice(7).toLowerCase();
  }

  return first.toLowerCase();
};

const extractRequestIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return normalizeIp(forwarded);

  return normalizeIp(req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress);
};

export const blockSuspendedIp = async (req, res, next) => {
  try {
    await ensureSuspendedIpTable();

    const ipAddress = extractRequestIp(req);
    if (!ipAddress) return next();

    const blocked = await SuspendedIp.findOne({
      where: {
        ipAddress,
        isActive: true,
        [Op.or]: [{ expiresAt: null }, { expiresAt: { [Op.gt]: new Date() } }],
      },
      attributes: ["id", "reason", "expiresAt"],
    });

    if (!blocked) return next();

    return res.status(403).json({
      message: "Access denied from this IP address",
      reason: blocked.reason || "IP suspended by administrator",
      expiresAt: blocked.expiresAt || null,
    });
  } catch (error) {
    // Fail-open to avoid accidental outages if lookup fails.
    return next();
  }
};

export default blockSuspendedIp;
