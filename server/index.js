require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const enquiryRoutes = require('./routes/enquiry');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/enquiry', enquiryRoutes);

app.get('/', (req, res) => {
  res.send('API running 🚀');
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
  
