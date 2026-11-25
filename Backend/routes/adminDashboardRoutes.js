import express from 'express';
import {
  getDashboardSummary,
  getAllReservations,
  updateReservationStatus,
  getAllCleaningRequests,
  assignStaffToCleaningRequestController,
  getAllMaintenanceReports
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

// Assign staff to a cleaning request
router.patch(
  '/cleaning-requests/:cleaningId/assign',
  assignStaffToCleaningRequestController
);

// Get all maintenance reports
router.get('/maintenance-reports', getAllMaintenanceReports);

export default router;
