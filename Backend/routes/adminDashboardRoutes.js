import express from 'express';
import {
  getDashboardSummary,
  getAllReservations
} from '../controllers/adminDashboardController.js';

const router = express.Router();

// Get administrator dashboard summary
router.get('/summary', getDashboardSummary);

// Get all reservation records
router.get('/reservations', getAllReservations);

export default router;
