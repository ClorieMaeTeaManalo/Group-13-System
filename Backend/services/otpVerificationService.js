import bcrypt from "bcrypt";
import pool from "../config/db.js";

// Function for verifying customer OTP
const verifyOTP = async (email, otp) => {

  // Find customer using email
  const [rows] = await pool.query(
    `SELECT otp_code, otp_expiry, verification_status
     FROM customers
     WHERE email = ?`,
    [email]
  );

  const customer = rows[0];

  // Check if customer exists
  if (!customer) {
    throw new Error("Customer account not found.");
  }

  // Check if already verified
  if (customer.verification_status === "Verified") {
    throw new Error("Email is already verified.");
  }

  // Check if OTP exists
  if (!customer.otp_code || !customer.otp_expiry) {
    throw new Error("No OTP found. Please request a new OTP.");
  }

  // Check if OTP has expired
  if (new Date(customer.otp_expiry) < new Date()) {
    throw new Error("OTP has expired. Please request a new OTP.");
  }

  // Compare entered OTP with hashed OTP
  const isMatch = await bcrypt.compare(
    String(otp),
    customer.otp_code
  );

  if (!isMatch) {
    throw new Error("Invalid OTP.");
  }

  // Update customer verification status
  await pool.query(
    `UPDATE customers
     SET verification_status = 'Verified',
         otp_code = NULL,
         otp_expiry = NULL
     WHERE email = ?`,
    [email]
  );

  return true;
};

export default verifyOTP;