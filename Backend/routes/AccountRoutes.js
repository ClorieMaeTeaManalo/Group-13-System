import express from 'express';
import * as AccountController from '../controllers/AccountController.js';

const router = express.Router();

// Create staff account
router.post('/create-staff', AccountController.createStaffAccount);

// Get all staff accounts
router.get('/staff', AccountController.getAllStaffAccounts);

export default router;