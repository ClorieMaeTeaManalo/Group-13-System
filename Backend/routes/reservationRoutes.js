
import express from "express";
import { submitReservation } from "../controllers/reservationController.js";
import customerAuthMiddleware from "../middleware/customerAuthMiddleware.js";

const router = express.Router();

// Submit customer reservation
router.post("/", customerAuthMiddleware, submitReservation);

export default router;
