import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Admin Authentication Routes
import adminAuthRoutes from './routes/adminAuthRoutes.js';

// Staff 
import staffRoutes from './routes/staffRoutes.js';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Admin Authentication Routes
app.use('/api/admin-auth', adminAuthRoutes);

// Staff Routes
app.use('/api/staff', staffRoutes);

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
