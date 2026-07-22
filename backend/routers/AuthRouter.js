
import express from 'express'
import { loginLimiter, loginUser,refreshToken,logout, registerUser,GetProfile, validateInviteToken, setupPasswordFromInvite, resendInvite } from '../controller/Authcontroller.js'
import { protect } from '../middleware/auth.js'
import { requirePermission } from '../middleware/role.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { authSchemas } from '../schemas/securitySchemas.js'
import { createUserFromMember, getUserById, getUsers, getAvailableMembersForUserCreation } from '../controller/UserController.js'
import { apiLimiter } from '../utility/rateLimiter.js'
const AuthRouter=express.Router()




AuthRouter.post('/auth/register', validateSchema({ body: authSchemas.register }), registerUser)
AuthRouter.post('/auth/login', loginLimiter, validateSchema({ body: authSchemas.login }), loginUser)

AuthRouter.post("/auth/refresh", refreshToken);
AuthRouter.post("/auth/logout", logout);

// Phase 8 - Invite-based password setup routes (rate limited)
AuthRouter.get("/auth/validate-invite/:token", apiLimiter, validateSchema({ params: authSchemas.validateInviteParams }), validateInviteToken);
AuthRouter.post("/auth/setup-password", apiLimiter, validateSchema({ body: authSchemas.setupPassword }), setupPasswordFromInvite);
AuthRouter.post("/auth/resend-invite", apiLimiter, validateSchema({ body: authSchemas.resendInvite }), resendInvite);

AuthRouter.get("/auth/me", protect, GetProfile);

AuthRouter.post('/users', protect, requirePermission(["Add Users", "Manage Members"]), createUserFromMember)
AuthRouter.get("/users/:id", protect, requirePermission(["View Users", "View Detail", "Manage Members"]), getUserById);
AuthRouter.get("/users", protect, requirePermission(["View Users", "View Detail", "Manage Members"]), getUsers);
AuthRouter.get("/users/available-members", protect, requirePermission(["Add Users", "Manage Members"]), getAvailableMembersForUserCreation);


export default AuthRouter;