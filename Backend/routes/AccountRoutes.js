import express from 'express';
import * as AccountController from '../controllers/AccountController.js';

const router = express.Router();

// Create staff account
router.post('/create-staff', AccountController.createStaffAccount);

// Get all staff accounts
router.get('/staff', AccountController.getAllStaffAccounts);

// Delete selected staff account
router.delete('/staff/:staffId', AccountController.deleteStaffAccount);

export default router;