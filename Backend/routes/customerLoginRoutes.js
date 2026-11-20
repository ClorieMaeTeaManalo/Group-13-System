
import express from "express";
import { login } from "../controllers/customerLoginController.js";

const router = express.Router();

// Customer login route
router.post("/login", login);

export default router;
