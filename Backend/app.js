// Import Express
import express from 'express';

// Import CORS
import cors from 'cors';

// Import Admin Routes
import adminRoutes from './routes/adminRoutes.js';

// Import Authentication Routes
import authRoutes from './routes/authRoutes.js';

// Import dotenv
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Admin Routes
app.use('/api/admin', adminRoutes);

// Authentication Routes
app.use('/api/auth', authRoutes);

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
