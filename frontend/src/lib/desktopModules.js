import {
  adminOnlyRoutes,
  LibraryAllowedRoutes,
  memberAllowedRoutes,
  moderatorAllowedRoutes,
  NAV_ITEMS,
  routePermissionMap,
} from "@/lib/dashboardNav";
import {
  getPermissionSet,
  getRoleName,
  isAdminRoleName,
} from "@/lib/permissions";

export function getVisibleNavItems(user) {
  const roleName = getRoleName(user);
  const permissionSet = getPermissionSet(user?.permissions, user?.role?.permissions, user?.roleInfo?.permissions);
  const isSuperAdmin = roleName.includes("super admin");

  const hasRoutePermission = (route) => {
    if (isSuperAdmin) return true;
    if (roleName === "book store") return true;

    const requiredPermissions = routePermissionMap[route];
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    return requiredPermissions.some((permission) => permissionSet.has(String(permission).toLowerCase()));
  };

  if (roleName === "member" || roleName === "members") {
    const allowed = new Set(memberAllowedRoutes);
    return NAV_ITEMS.filter((item) => allowed.has(item.url));
  }

  if (roleName === "moderator") {
    const allowed = new Set(moderatorAllowedRoutes);
    return NAV_ITEMS.filter((item) => allowed.has(item.url) && hasRoutePermission(item.url));
  }

  if (roleName === "book store") {
    const allowed = new Set(LibraryAllowedRoutes);
    return NAV_ITEMS.filter((item) => allowed.has(item.url) && hasRoutePermission(item.url));
  }

  if (isAdminRoleName(roleName)) {
    return NAV_ITEMS.filter((item) => hasRoutePermission(item.url));
  }

  return NAV_ITEMS.filter((item) => {
    if (adminOnlyRoutes.includes(item.url)) return false;
    return hasRoutePermission(item.url);
  });
}

export function getDesktopModules(user) {
  return getVisibleNavItems(user).map((item) => ({
    name: item.title,
    icon: item.icon,
    link: item.url,
  }));
}
