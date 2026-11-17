import express from 'express';
import { login, adminLogin } from '../controllers/authController.js';

const router = express.Router();

// Customer and Staff Login
router.post('/login', login);

// Administrator Login
router.post('/admin/login', adminLogin);

export default router;