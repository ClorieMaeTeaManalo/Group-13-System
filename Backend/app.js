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

// Customer Registration Routes
import customerRoutes from './routes/customerRoutes.js';

import customerLoginRoutes from './routes/customerLoginRoutes.js';

// Staff Account Creation Routes
import accountRoutes from './routes/AccountRoutes.js';

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

// Customer Routes
app.use('/api/customers', customerRoutes);

app.use('/api/customers', customerLoginRoutes);

// Staff Account Creation Routes
app.use('/api/accounts', accountRoutes);

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
