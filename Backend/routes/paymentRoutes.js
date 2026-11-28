import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  getPaymentInfoController,
  savePaymentInfoController
} from '../controllers/paymentController.js';

const router = express.Router();

// Set the folder and filename for uploaded QR images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Accept image files only
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

// Get all saved payment methods
router.get('/', getPaymentInfoController);

// Save or update a payment method with its QR image
router.post(
  '/',
  upload.single('qrImage'),
  savePaymentInfoController
);

export default router;