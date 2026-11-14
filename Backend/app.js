import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Admin Routes
app.use('/api/admin', adminRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Bella Beach Backend is running!');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
