import express from 'express';
import * as staffLoginController from '../controllers/StaffLoginController.js';

const router = express.Router();

// Staff Login
router.post(
    '/login',
    staffLoginController.loginStaff
);

export default router;
