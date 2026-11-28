import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Import Admin Authentication Routes
import adminAuthRoutes from './routes/adminAuthRoutes.js';

// Import Admin Dashboard Routes
import adminDashboardRoutes from './routes/adminDashboardRoutes.js';

// Staff 
import staffCleaningTaskRoutes from './routes/StaffCleaningTaskRoutes.js';

import staffCleaningStatusRoutes from './routes/StaffCleaningStatusRoutes.js';

import staffLoginRoutes from './routes/StaffLoginRoutes.js';

import staffCleaningReportRoutes from './routes/StaffCleaningReportRoutes.js';

// Customer Registration Routes
import customerRoutes from './routes/customerRoutes.js';

import customerLoginRoutes from './routes/customerLoginRoutes.js';

import customerProfileRoutes from './routes/customerProfileRoutes.js';

// Customer Reservation Routes
import reservationRoutes from './routes/reservationRoutes.js';

// Staff Account Creation Routes
import accountRoutes from './routes/AccountRoutes.js';

// Import payment routes
import paymentRoutes from './routes/paymentRoutes.js';

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Admin Authentication Routes
app.use('/api/admin-auth', adminAuthRoutes);

// Admin Dashboard Routes
app.use('/api/admin-dashboard', adminDashboardRoutes);

// Staff Routes
app.use('/api/staff', staffCleaningTaskRoutes);

app.use('/api/staff', staffCleaningStatusRoutes);

app.use('/api/staff-auth', staffLoginRoutes);

app.use('/api/staff', staffCleaningReportRoutes);

// Customer Routes
app.use('/api/customers', customerRoutes);

app.use('/api/customers', customerLoginRoutes);

app.use('/api/customers', customerProfileRoutes);

// Customer Reservation Routes
app.use('/api/reservations', reservationRoutes);

// Staff Account Creation Routes
app.use('/api/accounts', accountRoutes);

// Connect payment information routes
app.use('/api/payment', paymentRoutes);

// Allow access to uploaded payment QR code images
app.use('/uploads', express.static('uploads'));

// Test Route
app.get('/', (req, res) => {
  res.send('Bella Beach Backend is running!');
});

// Server Port
const PORT = 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
