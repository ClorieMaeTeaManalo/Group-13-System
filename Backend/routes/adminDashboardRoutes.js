import express from 'express';
import {
  getDashboardSummary,
  getAllReservations,
  updateReservationStatus
} from '../controllers/adminDashboardController.js';

const router = express.Router();

// Get administrator dashboard summary
router.get('/summary', getDashboardSummary);

// Get all reservation records
router.get('/reservations', getAllReservations);

// Update reservation status
router.patch('/reservations/:reservationId/status', updateReservationStatus);

export default router;
