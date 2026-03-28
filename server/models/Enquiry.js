const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    fromCity: { type: String, trim: true },
    toCity: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
