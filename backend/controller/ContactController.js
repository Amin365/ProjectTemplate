import { Contact } from '../models/index.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: true, message: 'Name and email are required' });
    }

    const contact = await Contact.create({ name, email, phone, message });

    return res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const listContacts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(100, parseInt(req.query.limit || '20', 10));
    const offset = (page - 1) * limit;

    const { count, rows } = await Contact.findAndCountAll({ limit, offset, order: [['createdAt', 'DESC']] });

    return res.json({ success: true, data: rows, meta: { total: count, page, limit } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ error: true, message: 'Contact not found' });
    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ error: true, message: 'Contact not found' });

    const allowed = ['status', 'name', 'email', 'phone', 'message'];
    const payload = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) payload[key] = req.body[key];
    }

    await contact.update(payload);
    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
