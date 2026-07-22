import express from "express"
import { createMember, getMembers,getMemberById,updateMember,bulkCreateMembers ,deleteMember,archiveMember,restoreMember,getMemberByCode,getMembersList,JoinClub, getJoinClubs, getJoinClubById, updateJoinClubStatus, getMemberOverview, createMemberNote, getMemberNotes, deleteMemberNote} from "../controller/members.js"
import { sendMemberEmail } from "../controller/EmailController.js"
import { optionalProtect, protect } from "../middleware/auth.js"
import { requireOwnerOrPermission, requirePermission } from "../middleware/role.js"
import { apiLimiter } from "../utility/rateLimiter.js"
import Member from "../models/Members.js"
import User from "../models/user.js"
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../utility/cloudinary.js'

   
    const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Books", // folder in cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) => Date.now() + "-" + file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });

const MemberRouter = express.Router()

const memberOwnerResolver = async (req) => {
  const { id } = req.params;
  const pathId = String(id || "").trim();
  if (!pathId) return null;

  const isNumeric = Number.isInteger(Number(pathId)) && Number(pathId) > 0;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(pathId);
  if (!isNumeric && !isUuid) return null;

  const member = await Member.findOne({
    where: isNumeric ? { id: Number(pathId) } : { uuid: pathId },
    attributes: ["id"],
  });
  if (!member) return null;

  const ownerUser = await User.findOne({ where: { member_id_fk: member.id }, attributes: ["id"] });
  return ownerUser?.id || null;
};


MemberRouter.param("id", (req, res, next, id) => {
  if (req.path.startsWith("/join-club/")) return next()

  const numericId = Number(id)
  const isNumeric = Number.isInteger(numericId) && numericId > 0
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(id || "").trim())
  if (!isNumeric && !isUuid) {
    return res.status(400).json({ message: "Invalid member id" })
  }
  next()
})




// collection routes
MemberRouter.route("/members")
  .get(protect, requirePermission(["View Members", "Manage Members"]), getMembers)
  .post(optionalProtect, upload.single("profile_picture"), createMember)

// static/specific routes MUST come before dynamic :id
// Protect the members list so we can return scoped lists for moderators
MemberRouter.get("/members/list", protect, getMembersList);
MemberRouter.get("/members/by-code/:code", protect, requirePermission(["View Members", "Manage Members"]), getMemberByCode);

// archive / restore and other item-specific actions
MemberRouter.post('/members/:id/send-email', protect, requirePermission(["Manage Members"]), sendMemberEmail)
MemberRouter.post("/members/:id/archive", protect, requirePermission(["Manage Members"]), archiveMember)
MemberRouter.post("/members/:id/restore", protect, requirePermission(["Manage Members"]), restoreMember)
MemberRouter.post("/members/bulk", protect, requirePermission(["Manage Members"]), bulkCreateMembers);

// Member overview (profile timeline)
MemberRouter.get(
  "/members/:id/overview",
  protect,
  requireOwnerOrPermission({
    permissions: ["View Members", "Manage Members"],
    resolveOwnerId: memberOwnerResolver,
  }),
  apiLimiter,
  getMemberOverview
);

// Member notes
MemberRouter.route("/members/:id/notes")
  .get(
    protect,
    requireOwnerOrPermission({
      permissions: ["View Members", "Manage Members"],
      resolveOwnerId: memberOwnerResolver,
    }),
    apiLimiter,
    getMemberNotes
  )
  .post(protect, requirePermission(["Manage Members"]), apiLimiter, createMemberNote);
MemberRouter.delete("/members/:id/notes/:noteId", protect, requirePermission(["Manage Members"]), apiLimiter, deleteMemberNote);

// generic item routes last
MemberRouter.route("/members/:id")
  .get(
    protect,
    requireOwnerOrPermission({
      permissions: ["View Members", "Manage Members"],
      resolveOwnerId: memberOwnerResolver,
    }),
    getMemberById
  )
  .put(protect, requirePermission(["Manage Members"]), upload.single("profile_picture"), updateMember)
  .delete(protect, requirePermission(["Manage Members"]), deleteMember)

MemberRouter.post("/join-club",JoinClub)

MemberRouter.get("/join-club", protect, requirePermission(["View Members", "Manage Members"]), apiLimiter, getJoinClubs)
MemberRouter.get("/join-club/:id", protect, requirePermission(["View Members", "Manage Members"]), apiLimiter, getJoinClubById)
MemberRouter.patch("/join-club/:id/status", protect, requirePermission(["Manage Members"]), apiLimiter, updateJoinClubStatus)
export default MemberRouter
