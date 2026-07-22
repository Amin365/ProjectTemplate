/**
 * Phase 8 - Audit Log Utility
 * Helper functions for creating audit log entries
 */

import AuditLog from "../models/AuditLog.js";

/**
 * Create an audit log entry
 */
export async function logAudit({
  user = null,
  action,
  entityType,
  entityId = null,
  entityLabel = null,
  changes = {},
  meta = {},
  req = null,
  description = null,
}) {
  try {
    const entry = {
      action,
      entityType,
      entityId: entityId ? parseInt(entityId, 10) || null : null,
      entityLabel,
      changes,
      meta,
      description,
    };

    if (user) {
      entry.user_id = user.id || null;
      entry.userEmail = user.email || null;
      entry.userName = user.first_name
        ? `${user.first_name} ${user.last_name || ""}`.trim()
        : user.username || null;
      
      if (user.role) {
        entry.userRole = typeof user.role === "object" 
          ? user.role.role || user.role.name 
          : user.role;
      }
    }

    if (req) {
      entry.ipAddress = req.ip || req.connection?.remoteAddress || null;
      entry.userAgent = req.get?.("User-Agent") || null;
    }

    await AuditLog.create(entry);
  } catch (err) {
    console.error("Failed to create audit log:", err.message);
  }
}

/**
 * Build changes object by comparing old and new values
 */
export function buildChanges(oldDoc, newDoc, fields) {
  const changes = {};
  
  for (const field of fields) {
    const oldVal = oldDoc?.[field];
    const newVal = newDoc?.[field];
    
    const oldStr = JSON.stringify(oldVal ?? null);
    const newStr = JSON.stringify(newVal ?? null);
    
    if (oldStr !== newStr) {
      changes[field] = {
        from: oldVal ?? null,
        to: newVal ?? null,
      };
    }
  }
  
  return changes;
}

export const logMemberAction = async (action, member, user, req, extra = {}) => {
  await logAudit({
    user,
    action: `member.${action}`,
    entityType: "Member",
    entityId: member.id,
    entityLabel: `${member.first_name || ""} ${member.last_name || ""}`.trim() || member.email,
    req,
    ...extra,
  });
};

export const logBookAction = async (action, book, user, req, extra = {}) => {
  await logAudit({
    user,
    action: `book.${action}`,
    entityType: "Book",
    entityId: book.id,
    entityLabel: book.title || "Unknown Book",
    req,
    ...extra,
  });
};

export const logIssueAction = async (action, issue, user, req, extra = {}) => {
  const bookTitle = issue.book?.title || "Unknown Book";
  const memberName = issue.member
    ? `${issue.member.first_name || ""} ${issue.member.last_name || ""}`.trim()
    : "Unknown Member";
  
  await logAudit({
    user,
    action: `issue.${action}`,
    entityType: "Issue",
    entityId: issue.id,
    entityLabel: `${bookTitle} → ${memberName}`,
    req,
    ...extra,
  });
};

export const logJoinRequestAction = async (action, joinRequest, user, req, extra = {}) => {
  await logAudit({
    user,
    action: `join_request.${action}`,
    entityType: "JoinRequest",
    entityId: joinRequest.id,
    entityLabel: joinRequest.FullName || joinRequest.email || "Unknown",
    req,
    ...extra,
  });
};

export const logRoleAction = async (action, role, user, req, extra = {}) => {
  await logAudit({
    user,
    action: `role.${action}`,
    entityType: "Role",
    entityId: role.id,
    entityLabel: role.role || role.name || "Unknown Role",
    req,
    ...extra,
  });
};

export const logUserAction = async (action, targetUser, actingUser, req, extra = {}) => {
  await logAudit({
    user: actingUser,
    action: `user.${action}`,
    entityType: "User",
    entityId: targetUser.id,
    entityLabel: targetUser.email || targetUser.username || "Unknown User",
    req,
    ...extra,
  });
};

export const logBlogAction = async (action, blog, user, req, extra = {}) => {
  await logAudit({
    user,
    action: `blog.${action}`,
    entityType: "Blog",
    entityId: blog.id,
    entityLabel: blog.title || "Unknown Blog",
    req,
    ...extra,
  });
};

export const logAuthAction = async (action, user, req, extra = {}) => {
  await logAudit({
    user,
    action: `auth.${action}`,
    entityType: "User",
    entityId: user?.id || null,
    entityLabel: user?.email || "Unknown",
    req,
    ...extra,
  });
};

export default {
  logAudit,
  buildChanges,
  logMemberAction,
  logBookAction,
  logIssueAction,
  logJoinRequestAction,
  logRoleAction,
  logUserAction,
  logBlogAction,
  logAuthAction,
};
