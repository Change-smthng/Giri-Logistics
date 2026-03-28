const express = require('express');

const Enquiry = require('../models/Enquiry');
const OfficeLocation = require('../models/OfficeLocation');
const SiteMetric = require('../models/SiteMetric');
const requireAdminAuth = require('../middleware/requireAdminAuth');

const router = express.Router();

router.use(requireAdminAuth);

router.get('/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return res.json(enquiries);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch enquiries.' });
  }
});

router.patch('/enquiries/:id/status', async (req, res) => {
  const { status } = req.body;

  if (!status || !['new', 'in-progress', 'closed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }

    return res.json({ success: true, enquiry });
  } catch {
    return res.status(500).json({ error: 'Failed to update enquiry.' });
  }
});

router.delete('/enquiries/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }

    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete enquiry.' });
  }
});

router.get('/locations', async (req, res) => {
  try {
    const locations = await OfficeLocation.find().sort({ createdAt: -1 });
    return res.json(locations);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch locations.' });
  }
});

router.post('/locations', async (req, res) => {
  const { city, state, officeType, latitude, longitude, emoji } = req.body;

  if (!city || !state || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'City, state, latitude, longitude are required.' });
  }

  try {
    const location = await OfficeLocation.create({
      city,
      state,
      officeType,
      latitude,
      longitude,
      emoji,
    });

    return res.status(201).json({ success: true, location });
  } catch {
    return res.status(500).json({ error: 'Failed to create location.' });
  }
});

router.put('/locations/:id', async (req, res) => {
  const { city, state, officeType, latitude, longitude, emoji } = req.body;

  if (!city || !state || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'City, state, latitude, longitude are required.' });
  }

  try {
    const location = await OfficeLocation.findByIdAndUpdate(
      req.params.id,
      { city, state, officeType, latitude, longitude, emoji },
      { new: true }
    );

    if (!location) {
      return res.status(404).json({ error: 'Location not found.' });
    }

    return res.json({ success: true, location });
  } catch {
    return res.status(500).json({ error: 'Failed to update location.' });
  }
});

router.delete('/locations/:id', async (req, res) => {
  try {
    const location = await OfficeLocation.findByIdAndDelete(req.params.id);

    if (!location) {
      return res.status(404).json({ error: 'Location not found.' });
    }

    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete location.' });
  }
});

router.get('/analytics', async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const enquiriesToday = await Enquiry.countDocuments({
      createdAt: { $gte: startOfToday },
    });

    const officeCount = await OfficeLocation.countDocuments();
    const visitsMetric = await SiteMetric.findOne({ key: 'total_visits' });

    return res.json({
      totalEnquiries,
      enquiriesToday,
      officeCount,
      totalVisits: visitsMetric?.value || 0,
    });
  } catch {
    return res.status(500).json({ error: 'Failed to fetch analytics.' });
  }
});

module.exports = router;
