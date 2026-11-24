import express from "express";
import { register } from "../controllers/customerController.js";
import { verifyCustomerOTP } from "../controllers/customerController.js";

const router = express.Router();

// Customer Registration
router.post("/register", register);
// Customer email OTP verification
router.post("/verify-otp", verifyCustomerOTP);

export default router;
