import express from 'express';
import { createContact, listContacts, getContact, updateContact } from '../controller/ContactController.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';
import { contactSubmissionLimiter } from '../utility/rateLimiter.js';

const router = express.Router();

const adminOnly = [protect, requireRole(['Super Admin', 'Admin'])];

const requireJson = (req, res, next) => {
  if (!req.is('application/json')) {
    return res.status(415).json({
      success: false,
      message: 'Content-Type application/json is required.',
    });
  }
  return next();
};

// Public XalTech website submission endpoint. POST is the only public method.
router.post('/xaltech/contacts', contactSubmissionLimiter, requireJson, createContact);

// Backward-compatible alias used by older cached frontend builds.
router.post('/contacts', contactSubmissionLimiter, requireJson, createContact);

// All contact administration remains authenticated and Admin/Super Admin only.
router.get('/contacts', adminOnly, listContacts);
router.get('/contacts/:id', adminOnly, getContact);
router.patch('/contacts/:id', adminOnly, updateContact);

export default router;
