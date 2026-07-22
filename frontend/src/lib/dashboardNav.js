import {
  ActivityIcon,
  Award,
  BarChart3,
  Bell,
  BookMarked,
  BookOpen,
  ClipboardList,
  FileChartColumn,
  LayoutGrid,
  ListOrdered,
  Megaphone,
  Settings,
  StickyNote,
  Target,
  Trophy,
  User,
  UserPlus2,
  Users2,
} from "lucide-react";

const memberRoles = ["member", "members"];
const reviewerRoles = ["moderator", "book store"];

export const memberAllowedRoutes = [
  "/dashboard",

  "/dashboard/notifications",
  "/dashboard/notification-settings",
];

export const moderatorAllowedRoutes = [
  "/dashboard",
 
  "/dashboard/notifications",
  "/dashboard/notification-settings",
];

export const LibraryAllowedRoutes = [
  "/dashboard",
 
  "/dashboard/notifications",
  "/dashboard/notification-settings",
];

export const adminOnlyRoutes = [
  "/dashboard/announcements",
  "/dashboard/audit-log",
  "/dashboard/system-health",
  "/dashboard/permissions",
];

export const routePermissionMap = {
  "/dashboard/users": ["view users", "add users", "edit users", "delete users"],
  "/dashboard/permissions": ["view role", "add role", "edit role", "delete role", "preferences"],
  "/dashboard/books": ["manage books"],
  "/dashboard/members": ["manage members", "view members"],
  "/dashboard/issues": ["manage issues"],
  "/dashboard/issues/request": ["manage issues"],
  "/dashboard/reservations": ["manage issues"],
  "/dashboard/moderators": ["view moderator"],
  "/dashboard/moderator-workspace": ["view moderator"],
  "/dashboard/pending-reports": ["view moderator"],
};

export const NAV_ITEMS = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid, isActive: true },
  { title: "Users", url: "/dashboard/users", icon: Users2, permissions: ["View Users"] },
  {
    title: "Permissions",
    url: "/dashboard/permissions",
    icon: Settings,
    permissions: ["View Role", "Add Role", "Edit Role", "Delete Role", "Manage Permissions"],
  },
 
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  { title: "Notification Settings", url: "/dashboard/notification-settings", icon: Settings },
  {
    title: "Announcements",
    url: "/dashboard/announcements",
    icon: Megaphone,
    permissions: ["Manage Members", "Manage Issues", "Edit Role"],
  },
  {
    title: "Reporting Center",
    url: "/dashboard/reporting",
    icon: BarChart3,
    permissions: ["View Reports", "Manage Members", "Manage Issues"],
    hiddenForRoles: memberRoles,
  },


//   {
//     title: "Resources",
//     url: "/dashboard/resources",
//     icon: Bot,
//     permissions: ["Manage Members", "Manage Books", "Manage Issues"],
//     hiddenForRoles: memberRoles,
//   },
  {
    title: "Audit Log",
    url: "/dashboard/audit-log",
    icon: FileChartColumn,
    permissions: ["View Audit Log", "View Role", "Edit Role", "Delete Role"],
    hiddenForRoles: [...memberRoles, "moderator", "book store"],
  },
  {
    title: "System Health",
    url: "/dashboard/system-health",
    icon: ActivityIcon,
    permissions: ["View System Health", "View Role", "Edit Role", "Delete Role"],
    hiddenForRoles: [...memberRoles, "moderator", "book store"],
  },
];
