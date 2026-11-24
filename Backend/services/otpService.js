import crypto from "crypto";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import sendEmail from "./gmailService.js";

// Function for generating and sending OTP to customer
const sendOTP = async (email) => {
  try {
    // Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    // Hash OTP before saving to database
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Set OTP expiration to 5 minutes
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    // Save hashed OTP and expiration time
    const [result] = await pool.query(
      `UPDATE customers
       SET otp_code = ?, otp_expiry = ?
       WHERE email = ?`,
      [hashedOTP, expiry, email]
    );

    // Check if customer exists
    if (result.affectedRows === 0) {
      throw new Error("Customer not found. OTP was not saved.");
    }

    // Send OTP through Gmail API
    await sendEmail(
      email,
      "Bella Beach - Email Verification",
      `Your verification code is ${otp}. It expires in 5 minutes.`
    );

    console.log("OTP email sent successfully to:", email);

    return true;

  } catch (error) {
    console.error("OTP Service Error:", error.message);
    throw error;
  }
};

export default sendOTP;
