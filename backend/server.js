const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging middleware (optional)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// ============= ROUTES =============

// Authentication Routes
app.use('/api/auth', require('./routes/auth'));

// Document Management Routes
app.use('/api/documents', require('./routes/documents'));

// Filing Management Routes
app.use('/api/filings', require('./routes/filings'));

// Invoice & Payment Routes
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/payment', require('./routes/payment'));  // NEW: Payment gateway

// Chat Routes
app.use('/api/chat', require('./routes/chat'));

// Client Management Routes
app.use('/api/clients', require('./routes/clients'));

// Admin Routes
app.use('/api/admin', require('./routes/admin'));

// Analytics Routes
app.use('/api/analytics', require('./routes/analytics'));

// Reminder Routes
app.use('/api/reminders', require('./routes/reminders'));

// GST Verification Routes
app.use('/api/gst', require('./routes/gst'));

// Business Registration Routes (NEW)
app.use('/api/business', require('./routes/business'));

// ============= HEALTH CHECK =============
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ============= ERROR HANDLING MIDDLEWARE =============

// 404 Not Found handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `Duplicate value for ${field}. Please use another value.`,
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please login again.',
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired. Please login again.',
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ============= START SERVER =============
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────────┐
  │   🚀 Server is running!                     │
  │   📡 Port: ${PORT}                              │
  │   🌍 Environment: ${process.env.NODE_ENV || 'development'}        │
  │   🔗 API URL: http://localhost:${PORT}/api     │
  └─────────────────────────────────────────────┘
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});