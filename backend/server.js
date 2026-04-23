const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const memberRoutes = require('./routes/memberRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ----- Connect to MongoDB -----
connectDB();

// ----- Middleware -----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ----- API Routes -----
app.use('/api/members', memberRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Student Team Manager API is running 🚀' });
});

// ----- Global Error Handler -----
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ----- Start Server -----
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
