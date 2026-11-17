import pool from '../config/db.js';
import bcrypt from 'bcrypt';

// Administrator Login
export const loginAdmin = async (email, password) => {

  // Check required fields
  if (!email || !password) {
    throw new Error('Email and password are required!');
  }

  // Find administrator account
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND role = 'admin'",
    [email.trim()]
  );

  // Check if administrator exists
  if (rows.length === 0) {
    throw new Error('Invalid email or password!');
  }

  const admin = rows[0];

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isPasswordValid) {
    throw new Error('Invalid email or password!');
  }

  // Return administrator information
  return {
    user_id: admin.user_id,
    name: admin.name,
    email: admin.email,
    role: admin.role
  };
};
