const mongoose = require('mongoose');

const officeLocationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    officeType: { type: String, trim: true, default: 'Branch' },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    emoji: { type: String, trim: true, default: '📍' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OfficeLocation', officeLocationSchema);
