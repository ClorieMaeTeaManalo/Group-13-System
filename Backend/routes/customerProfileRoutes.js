
import express from "express";

import {
  getCustomerProfile,
  updateCustomerProfile
} from "../controllers/customerProfileController.js";

import customerAuthMiddleware from "../middleware/customerAuthMiddleware.js";

const router = express.Router();

// Retrieve logged-in customer profile
router.get(
  "/profile",
  customerAuthMiddleware,
  getCustomerProfile
);

// Update logged-in customer profile
router.put(
  "/profile",
  customerAuthMiddleware,
  updateCustomerProfile
);

export default router;
