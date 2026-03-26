const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// POST /api/enquiry — save a new enquiry
router.post('/', async (req, res) => {
  const { name, phone, fromCity, toCity, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  try {
    const enquiry = await Enquiry.create({ name, phone, fromCity, toCity, message });
    res.status(201).json({ success: true, enquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// GET /api/enquiry — list all enquiries (for admin use)
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
