require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const enquiryRoutes = require('./routes/enquiry');
const adminAuthRoutes = require('./routes/adminAuth');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();

const allowedOrigins = [
  'https://giri-logistics.vercel.app',
  'https://www.giri-logistics.vercel.app',
  'http://localhost:3000',
  process.env.CLIENT_ORIGIN,
]
  .filter(Boolean)
  .map((origin) => origin.replace(/\/$/, ''));

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const normalizedOrigin = origin.replace(/\/$/, '');

  if (allowedOrigins.includes(normalizedOrigin)) {
    return true;
  }

  if (/^https:\/\/giri-logistics(-[a-z0-9-]+)?\.vercel\.app$/.test(normalizedOrigin)) {
    return true;
  }

  return false;
};

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

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
  
