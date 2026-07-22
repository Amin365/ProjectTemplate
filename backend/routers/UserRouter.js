import express from "express";
import rateLimit from "express-rate-limit";
import { protect } from "../middleware/auth.js";
import { requireOwnerOrPermission, requirePermission } from "../middleware/role.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { userSchemas } from "../schemas/securitySchemas.js";
import User from "../models/user.js";
import {
  getUsers,
  getUserById,
  createUserFromMember,
  updateUserStatus,
  updateUserById,
  adminChangeUserPassword,
  getAvailableMembersForUserCreation,
  updateProfile,
  changePassword,
  deleteAccount,
  getProfile,
  forgotPassword,
  resetPassword,
  resendResetCode,
  verifyResetCode
} from "../controller/UserController.js";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../utility/cloudinary.js'

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "Profile",
//     allowed_formats: ["jpg", "jpeg", "png", "gif"],
//     public_id: (req, file) => Date.now() + "-" + file.originalname.split(".")[0],
//   }
// });
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Profile",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "heic", "heif"],
    public_id: (req, file) =>
      Date.now() + "-" + file.originalname.split(".")[0],
  },
});



const upload = multer({ storage ,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB file size limit
});

const router = express.Router();

const passwordRecoveryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many password recovery attempts. Try again later." },
});

const verifyCodeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many verification attempts. Try again later." },
});
const isUuid = (value) =>
  typeof value === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.trim());

const resolveUserOwnerId = async (req) => {
  const { id } = req.params;
  if (!id) return null;

  let targetUser = null;
  if (Number.isInteger(Number(id)) && Number(id) > 0) {
    targetUser = await User.findByPk(Number(id), { attributes: ["id"] });
  } else if (isUuid(id)) {
    targetUser = await User.findOne({ where: { uuid: String(id).trim() }, attributes: ["id"] });
  }

  return targetUser?.id || null;
};

// Profile routes (for current user, no admin guard)
// router.put("/profile", protect, upload.single('profile'), updateProfile); 

router.put(
  "/profile",
  protect,
  (req, res, next) => {
    upload.single("profile")(req, res, (err) => {
      if (err) {
        console.error(" MULTER ERROR:", err);
        return res.status(400).json({
          message: err.message || "File upload error",
        });
      }
      next();
    });
  },
  updateProfile
);

router.put("/profile/change-password", protect, changePassword); // Change password
router.delete("/profile/delete", protect, deleteAccount); // Delete account

// Users management routes (permission-based)
router.get('/available_members', protect, requirePermission(["Add Users", "Manage Members"]), getAvailableMembersForUserCreation);
router.get("/users", protect, requirePermission(["View Users", "View Detail", "Manage Members"]), getUsers);
router.get(
  "/users/:id",
  protect,
  validateSchema({ params: userSchemas.userIdParams }),
  requireOwnerOrPermission({
    permissions: ["View Users", "View Detail", "Manage Members"],
    resolveOwnerId: resolveUserOwnerId,
  }),
  getUserById
);
router.post("/users/from-member", protect, requirePermission(["Add Users", "Manage Members"]), createUserFromMember);
router.patch("/users/:id/status", protect, validateSchema({ params: userSchemas.userIdParams }), requirePermission(["Edit Users", "Manage Members"]), updateUserStatus);
router.patch("/users/:id", protect, validateSchema({ params: userSchemas.userIdParams }), requirePermission(["Edit Users", "Manage Members"]), updateUserById);
router.put("/users/:id/password", protect, validateSchema({ params: userSchemas.userIdParams }), requirePermission(["Edit Users", "Manage Members"]), adminChangeUserPassword);
router.get("/profile", protect, getProfile);
router.post("/forgot-password", passwordRecoveryLimiter, validateSchema({ body: userSchemas.forgotPassword }), forgotPassword);
router.post("/reset-password", passwordRecoveryLimiter, validateSchema({ body: userSchemas.resetPassword }), resetPassword);
router.post("/resend-reset-code", passwordRecoveryLimiter, validateSchema({ body: userSchemas.resendResetCode }), resendResetCode);
router.post("/verify-reset-code", verifyCodeLimiter, validateSchema({ body: userSchemas.verifyResetCode }), verifyResetCode);

export default router;
