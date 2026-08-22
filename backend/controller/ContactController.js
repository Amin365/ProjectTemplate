import { Op } from 'sequelize';
import { Contact } from '../models/index.js';

const REQUEST_TYPES = new Set(['general', 'school_demo']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s.]{7,32}$/;

const cleanSingleLine = (value, maxLength) =>
  String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const cleanMessage = (value, maxLength = 2000) =>
  String(value ?? '')
    .replace(/\u0000/g, '')
    .trim()
    .slice(0, maxLength);

const parseStudentCount = (value) => {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 1_000_000) return NaN;
  return parsed;
};

export const createContact = async (req, res) => {
  try {
    // Honeypot: normal clients keep this field empty. Bots commonly fill it.
    if (cleanSingleLine(req.body?.website, 200)) {
      return res.status(201).json({
        success: true,
        message: 'Your request has been received.',
      });
    }

    const requestType = REQUEST_TYPES.has(req.body?.requestType)
      ? req.body.requestType
      : 'general';

    const name = cleanSingleLine(req.body?.name, 120);
    const email = cleanSingleLine(req.body?.email, 254).toLowerCase();
    const phone = cleanSingleLine(req.body?.phone, 32);
    const message = cleanMessage(req.body?.message);
    const schoolName = cleanSingleLine(req.body?.schoolName, 255);
    const schoolRole = cleanSingleLine(req.body?.schoolRole, 120);
    const schoolLocation = cleanSingleLine(req.body?.schoolLocation, 255);
    const preferredDemoTime = cleanSingleLine(req.body?.preferredDemoTime, 120);
    const studentCount = parseStudentCount(req.body?.studentCount);

    if (!name || name.length < 2) {
      return res.status(400).json({ success: false, message: 'A valid name is required.' });
    }

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    if (phone && !PHONE_RE.test(phone)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid phone number.' });
    }

    if (Number.isNaN(studentCount)) {
      return res.status(400).json({ success: false, message: 'Student count must be a valid number.' });
    }

    if (requestType === 'school_demo' && !schoolName) {
      return res.status(400).json({ success: false, message: 'School name is required for a school demo.' });
    }

    // Prevent rapid duplicate submissions from the same address while still
    // allowing a person to submit another request later.
    const duplicate = await Contact.findOne({
      where: {
        email,
        createdAt: { [Op.gte]: new Date(Date.now() - 60 * 1000) },
      },
      attributes: ['id'],
    });

    if (duplicate) {
      return res.status(429).json({
        success: false,
        message: 'A request from this email was just received. Please wait before submitting again.',
      });
    }

    await Contact.create({
      name,
      email,
      phone: phone || null,
      message: message || null,
      requestType,
      schoolName: requestType === 'school_demo' ? schoolName : null,
      schoolRole: requestType === 'school_demo' ? schoolRole || null : null,
      schoolLocation: requestType === 'school_demo' ? schoolLocation || null : null,
      studentCount: requestType === 'school_demo' ? studentCount : null,
      preferredDemoTime: requestType === 'school_demo' ? preferredDemoTime || null : null,
      source: 'xaltech_web',
    });

    // Never expose the stored database record to an anonymous caller.
    return res.status(201).json({
      success: true,
      message: requestType === 'school_demo'
        ? 'Your school demo request has been received. We will contact you soon.'
        : 'Your request has been received. We will contact you soon.',
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({ success: false, message: 'Unable to submit your request right now.' });
  }
};

export const listContacts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10)));
    const offset = (page - 1) * limit;
    const search = cleanSingleLine(req.query.search || req.query.q, 120);
    const requestType = cleanSingleLine(req.query.requestType, 40);
    const status = cleanSingleLine(req.query.status, 20);

    const where = {};

    if (requestType && REQUEST_TYPES.has(requestType)) where.requestType = requestType;
    if (status === 'new' || status === 'read') where.status = status;

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { schoolName: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Contact.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return res.json({ success: true, data: rows, meta: { total: count, page, limit } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Unable to load contacts.' });
  }
};

export const getContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Unable to load contact.' });
  }
};

export const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });

    // Admin mutation is deliberately narrow: public-submitted identity and
    // school details are immutable here; administrators only manage status.
    if (!['new', 'read'].includes(req.body?.status)) {
      return res.status(400).json({ success: false, message: 'Status must be new or read.' });
    }

    await contact.update({ status: req.body.status });
    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Unable to update contact.' });
  }
};
