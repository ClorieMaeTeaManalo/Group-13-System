import express from "express";
import { register } from "../controllers/customerController.js";

const router = express.Router();

// Customer Registration
router.post("/register", register);

export default router;
