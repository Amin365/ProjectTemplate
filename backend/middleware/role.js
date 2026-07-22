
const normalizeRole = (value) => String(value || "").trim().toLowerCase();

const getUserRoleName = (user) => {
  const raw = user?.role?.role || user?.role;
  return normalizeRole(raw);
};

const hasPermissions = (userPermissions = [], requiredPermissions = [], requireAll = false) => {
  const normalizedUserPerms = new Set((userPermissions || []).map((p) => String(p).toLowerCase()));
  const normalizedRequired = (requiredPermissions || []).map((p) => String(p).toLowerCase());

  if (requireAll) {
    return normalizedRequired.every((p) => normalizedUserPerms.has(p));
  }
  return normalizedRequired.some((p) => normalizedUserPerms.has(p));
};

export const requireRole = (roles = []) => (req, res, next) => {
  const roleName = getUserRoleName(req.user);
  const allowed = roles.map(normalizeRole);
  if (!req.user || !allowed.includes(roleName)) {
    return res.status(403).json({ message: "Access denied" });
  }
  return next();
};

/**
 * Phase 8 - Permission-based middleware
 * Checks if the user has the required permission(s)
 * @param {string|string[]} permissions - Required permission(s)
 * @param {Object} options - Configuration options
 * @param {boolean} options.requireAll - If true, requires all permissions; if false, requires any one
 */
export const requirePermission = (permissions, options = {}) => async (req, res, next) => {
  try {
    const { requireAll = false } = options;
    
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get user's permissions from JWT or populated user object
    const userPermissions = req.user.permissions || [];
    const permArray = Array.isArray(permissions) ? permissions : [permissions];

    const hasAccess = hasPermissions(userPermissions, permArray, requireAll);

    if (!hasAccess) {
      return res.status(403).json({ 
        message: "Insufficient permissions",
        required: permArray,
      });
    }

    return next();
  } catch (error) {
    console.error("Permission check error:", error);
    return res.status(500).json({ message: "Permission check failed" });
  }
};

/**
 * Combined role OR permission check
 * Allows access if user has the role OR the permission
 */
export const requireRoleOrPermission = (roles = [], permissions = []) => async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const roleName = getUserRoleName(req.user);
    const hasRole = roles.map(normalizeRole).includes(roleName);

    if (hasRole) {
      return next();
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = hasPermissions(userPermissions, permissions, false);

    if (hasPermission) {
      return next();
    }

    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    console.error("Role/permission check error:", error);
    return res.status(500).json({ message: "Access check failed" });
  }
};

/**
 * Owner-or-permission access control.
 * Allows access when user has required permission(s) OR owns the target resource.
 *
 * @param {Object} config
 * @param {string|string[]} config.permissions Required permission(s)
 * @param {(req:any)=>Promise<number|string|null>} config.resolveOwnerId Async resolver returning owner user id for target resource
 * @param {boolean} [config.requireAll=false] Require all permissions instead of any
 */
export const requireOwnerOrPermission = ({ permissions, resolveOwnerId, requireAll = false }) => async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userPermissions = req.user.permissions || [];
    const permArray = Array.isArray(permissions) ? permissions : [permissions];
    const hasPermission = hasPermissions(userPermissions, permArray, requireAll);

    if (hasPermission) {
      return next();
    }

    if (typeof resolveOwnerId !== "function") {
      return res.status(403).json({ message: "Access denied" });
    }

    const ownerId = await resolveOwnerId(req);
    const currentUserId = Number(req.user?.id);
    if (ownerId && Number(ownerId) === currentUserId) {
      return next();
    }

    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    console.error("Owner/permission check error:", error);
    return res.status(500).json({ message: "Access check failed" });
  }
};
