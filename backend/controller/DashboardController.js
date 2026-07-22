
import { Op, fn, col, literal } from "sequelize";

import User from "../models/user.js";

const USE_MOCK = String(process.env.DASHBOARD_USE_MOCK || "false").toLowerCase() === "true";

const hasAnyPermission = (req, perms = []) => {
  const userPerms = new Set((req.user?.permissions || []).map((p) => String(p).toLowerCase()));
  return perms.some((p) => userPerms.has(String(p).toLowerCase()));
};

const canViewDashboard = (req) => {
  const roleName = String(req.user?.role?.role || req.user?.role?.plural || req.user?.role || "").toLowerCase();
  if (/super\s*admin/i.test(roleName) || /moderator/i.test(roleName) || /admin/i.test(roleName) || /book\s*store/i.test(roleName)) {
    return true;
  }
  return hasAnyPermission(req, ["View Members", "Manage Members", "Manage Books", "Manage Issues", "View Users"]);
};

const mock = {
  stats: {
    totalBooks: 320,
    availableBooks: 211,
    borrowedBooks: 109,
    totalMembers: 145,
    activeMembers: 120,
    overdueIssues: 8,
    pendingJoinRequests: 6,
    pendingDailyReports: 14,
  },
  recentActivity: [
    { type: "member_created", label: "New member: John Doe", meta: { code: "MBR-1001" }, timestamp: "2026-07-22T09:30:00.000Z" },
    { type: "book_created", label: 'New book added: "Atomic Habits"', meta: { author: "James Clear" }, timestamp: "2026-07-22T08:10:00.000Z" },
    { type: "issue_created", label: 'Book issued: "Deep Work" → Sarah Ahmed', meta: {}, timestamp: "2026-07-21T17:20:00.000Z" },
    { type: "issue_returned", label: 'Book returned: "Clean Code" by Michael Lee', meta: {}, timestamp: "2026-07-21T14:05:00.000Z" },
    { type: "join_request", label: "Join request from Emily Carter", meta: { status: "Pending", email: "emily@example.com" }, timestamp: "2026-07-21T12:40:00.000Z" },
    { type: "daily_report", label: 'Daily report by Admin User on "The Pragmatic Programmer"', meta: {}, timestamp: "2026-07-21T11:15:00.000Z" },
    { type: "blog_published", label: 'Blog published: "Top 10 Productivity Books"', meta: { author: "Club Editor" }, timestamp: "2026-07-20T19:00:00.000Z" },
  ],
  topReaders: [
    { _id: 1, reportCount: 32, lastReport: "2026-07-21T11:15:00.000Z", totalPages: 540, name: "Sarah Ahmed", memberCode: "MBR-0021", avatar: null },
    { _id: 2, reportCount: 27, lastReport: "2026-07-21T09:10:00.000Z", totalPages: 470, name: "Michael Lee", memberCode: "MBR-0018", avatar: null },
    { _id: 3, reportCount: 19, lastReport: "2026-07-20T15:25:00.000Z", totalPages: 320, name: "Emily Carter", memberCode: "MBR-0030", avatar: null },
  ],
  popularBooks: [
    { _id: 11, issueCount: 44, title: "Atomic Habits", author: "James Clear", availableCopies: 4, totalCopies: 10, cover: null },
    { _id: 7, issueCount: 39, title: "Deep Work", author: "Cal Newport", availableCopies: 2, totalCopies: 8, cover: null },
    { _id: 23, issueCount: 31, title: "Clean Code", author: "Robert C. Martin", availableCopies: 1, totalCopies: 6, cover: null },
  ],
  pendingApprovals: {
    pendingJoinRequests: [
      { id: 101, FullName: "New Applicant", email: "new@applicant.com", phone: "0911000000", createdAt: "2026-07-22T07:40:00.000Z" },
    ],
    overdueIssues: [
      {
        id: 501,
        book_id: 7,
        member_id: 21,
        createdAt: "2026-07-18T10:00:00.000Z",
        book: { id: 7, title: "Deep Work", author: "Cal Newport" },
        member: { id: 21, first_name: "Sarah", last_name: "Ahmed", code: "MBR-0021" },
      },
    ],
    todayReports: [
      {
        id: 801,
        created_by: 1,
        book_id: 11,
        createdAt: "2026-07-22T09:00:00.000Z",
        createdBy: { id: 1, first_name: "Admin", last_name: "User" },
        book: { id: 11, title: "Atomic Habits", author: "James Clear" },
      },
    ],
  },
};

// GET /api/dashboard/stats
export const getDashboardStats = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canViewDashboard(req)) return res.status(403).json({ message: "Access denied" });

    if (USE_MOCK) return res.json(mock.stats);

    const [
      totalBooks,
      availableBooks,
      borrowedBooks,
      totalMembers,
      activeMembers,
      overdueIssues,
      pendingJoinRequests,
      pendingDailyReports,
    ] = await Promise.all([
      Book.count(),
      Book.sum("availableCopies"),
      Issue.count({ where: { status: "Issued" } }),
      Member.count(),
      Member.count({ where: { status: "Active" } }),
      Issue.count({ where: { status: "Overdue" } }),
      Clubreq.count({ where: { status: "Pending" } }),
      DailyReport.count({ where: { status: "Pending" } }),
    ]);

    return res.json({
      totalBooks,
      availableBooks: availableBooks ?? 0,
      borrowedBooks,
      totalMembers,
      activeMembers,
      overdueIssues,
      pendingJoinRequests,
      pendingDailyReports,
    });
  } catch {
    return res.json(mock.stats);
  }
};

// GET /api/dashboard/activity
export const getRecentActivity = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canViewDashboard(req)) return res.status(403).json({ message: "Access denied" });

    if (USE_MOCK) return res.json(mock.recentActivity);

    // keep your existing DB logic here (unchanged)
    return res.json([]); // replace with your real result
  } catch {
    return res.json(mock.recentActivity);
  }
};

// GET /api/dashboard/top-readers
export const getTopReaders = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (USE_MOCK) return res.json(mock.topReaders);

    // keep your existing DB logic here (unchanged)
    return res.json([]); // replace with your real result
  } catch {
    return res.json(mock.topReaders);
  }
};

// GET /api/dashboard/popular-books
export const getPopularBooks = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (USE_MOCK) return res.json(mock.popularBooks);

    // keep your existing DB logic here (unchanged)
    return res.json([]); // replace with your real result
  } catch {
    return res.json(mock.popularBooks);
  }
};

// GET /api/dashboard/pending-approvals
export const getPendingApprovals = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    if (!canViewDashboard(req)) return res.status(403).json({ message: "Access denied" });
    if (USE_MOCK) return res.json(mock.pendingApprovals);

    // keep your existing DB logic here (unchanged)
    return res.json({ pendingJoinRequests: [], overdueIssues: [], todayReports: [] });
  } catch {
    return res.json(mock.pendingApprovals);
  }
};

export default {
  getDashboardStats,
  getRecentActivity,
  getTopReaders,
  getPopularBooks,
  getPendingApprovals,
};