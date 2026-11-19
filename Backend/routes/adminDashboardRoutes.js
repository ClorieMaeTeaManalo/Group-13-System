import express from 'express';
import { getDashboardSummary } from '../controllers/adminDashboardController.js';

const router = express.Router();

// Get administrator dashboard summary
router.get('/summary', getDashboardSummary);

export default router;