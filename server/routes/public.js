const express = require('express');

const OfficeLocation = require('../models/OfficeLocation');
const SiteMetric = require('../models/SiteMetric');

const router = express.Router();

router.get('/locations', async (req, res) => {
  try {
    const locations = await OfficeLocation.find().sort({ createdAt: -1 });
    return res.json(locations);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch locations.' });
  }
});

router.post('/visit', async (req, res) => {
  try {
    const metric = await SiteMetric.findOneAndUpdate(
      { key: 'total_visits' },
      { $inc: { value: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json({ success: true, totalVisits: metric.value });
  } catch {
    return res.status(500).json({ error: 'Failed to track visit.' });
  }
});

module.exports = router;
