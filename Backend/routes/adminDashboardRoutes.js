import express from 'express';
import {
  getDashboardSummary,
  getAllReservations,
  updateReservationStatus,
  getAllCleaningRequests
} from '../controllers/adminDashboardController.js';

const router = express.Router();

// Get administrator dashboard summary
router.get('/summary', getDashboardSummary);

// Get all reservation records
router.get('/reservations', getAllReservations);

// Update reservation status
router.patch('/reservations/:reservationId/status', updateReservationStatus);

// Get all cleaning requests
router.get('/cleaning-requests', getAllCleaningRequests);

export default router;
