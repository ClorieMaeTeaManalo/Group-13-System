import express from 'express';

import {
  getAllUsers,
  getAllStaff,
  createStaff,
  deleteStaff,
  getAllReservations,
  updateReservationStatus,
  getCleaningReports,
  getMaintenanceReports
} from '../controllers/adminController.js';

const router = express.Router();

// User Management
router.get('/users', getAllUsers);

// Staff Management
router.get('/staff', getAllStaff);
router.post('/staff', createStaff);
router.delete('/staff/:id', deleteStaff);

// Reservation Management
router.get('/reservations', getAllReservations);
router.patch('/reservations/:id/status', updateReservationStatus);

// Cleaning Reports
router.get('/cleaning-reports', getCleaningReports);

// Maintenance Reports
router.get('/maintenance-reports', getMaintenanceReports);

export default router;
