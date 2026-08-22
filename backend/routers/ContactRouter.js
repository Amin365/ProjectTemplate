import express from 'express';
import { createContact, listContacts, getContact, updateContact } from '../controller/ContactController.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';
import { apiLimiter } from '../utility/rateLimiter.js';

const router = express.Router();

const adminOnly = [protect, requireRole(['Super Admin', 'Admin'])];

// Public website enquiry/demo submission. Rate-limited to reduce spam/abuse.
router.post('/contacts', apiLimiter, createContact);

// Contact administration is restricted to administrators.
router.get('/contacts', adminOnly, listContacts);
router.get('/contacts/:id', adminOnly, getContact);
router.patch('/contacts/:id', adminOnly, updateContact);

export default router;
