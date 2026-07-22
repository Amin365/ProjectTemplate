import { z } from "zod";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const userIdParam = z.object({
  id: z
    .string()
    .trim()
    .refine((value) => /^\d+$/.test(value) || uuidRegex.test(value), {
      message: "id must be a positive integer or UUID",
    }),
});

const issueRequestIdParam = z.object({
  id: z.string().regex(/^\d+$/, "id must be a positive integer"),
});

export const authSchemas = {
  register: z.object({
    username: z.string().trim().min(2).max(64).optional(),
    first_name: z.string().trim().min(1).max(100).optional(),
    last_name: z.string().trim().min(1).max(100).optional(),
    fullName: z.string().trim().min(2).max(200).optional(),
    email: z.string().trim().email().max(255),
    password: z.string().min(8).max(128),
  }),
  login: z
    .object({
      identifier: z.string().trim().min(3).max(255).optional(),
      email: z.string().trim().email().max(255).optional(),
      username: z.string().trim().min(3).max(255).optional(),
      password: z.string().min(1).max(128),
    })
    .refine((v) => Boolean(v.identifier || v.email || v.username), {
      message: "identifier, email or username is required",
      path: ["identifier"],
    }),
  setupPassword: z.object({
    token: z.string().trim().min(20).max(512),
    password: z.string().min(8).max(128),
  }),
  resendInvite: z.object({
    email: z.string().trim().email().max(255),
  }),
  validateInviteParams: z.object({
    token: z.string().trim().min(20).max(512),
  }),
};

export const userSchemas = {
  forgotPassword: z.object({
    email: z.string().trim().email().max(255),
  }),
  resendResetCode: z.object({
    email: z.string().trim().email().max(255),
  }),
  verifyResetCode: z.object({
    email: z.string().trim().email().max(255),
    code: z.string().trim().regex(/^\d{6}$/, "code must be 6 digits"),
  }),
  resetPassword: z.object({
    userId: z.coerce.number().int().positive(),
    code: z.string().trim().regex(/^\d{6}$/, "code must be 6 digits"),
    newPassword: z.string().min(8).max(128),
  }),
  userIdParams: userIdParam,
};

export const issueRequestSchemas = {
  create: z.object({
    book: z.coerce.number().int().positive(),
    member: z.coerce.number().int().positive(),
    requestedDays: z.coerce.number().int().min(1).max(30).optional(),
    note: z.string().trim().max(500).optional(),
  }),
  review: z.object({
    reviewNote: z.string().trim().max(500).optional(),
  }),
  convertToIssue: z.object({
    issueDate: z.string().trim().min(8).max(40),
    returnDate: z.string().trim().min(8).max(40),
  }),
  idParams: issueRequestIdParam,
};
