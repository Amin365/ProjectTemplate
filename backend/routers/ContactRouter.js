import express from 'express';
import { createContact, listContacts, getContact, updateContact } from '../controller/ContactController.js';

const router = express.Router();

router.post('/contacts', createContact);
router.get('/contacts', listContacts);
router.get('/contacts/:id', getContact);
router.patch('/contacts/:id', updateContact);

export default router;
