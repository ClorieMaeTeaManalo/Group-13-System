import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Login for Customer and Staff
export const loginUser = async (email, password) => {

  if (!email || !password) {
    throw new Error('Email and password are required!');
  }

  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email.trim()]
  );

  if (rows.length === 0) {
    throw new Error('Invalid email or password!');
  }

  const user = rows[0];

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error('Invalid email or password!');
  }

  return {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

// Administrator Login
export const loginAdmin = async (email, password) => {

  // Check required fields
  if (!email || !password) {
    throw new Error('Email and password are required!');
  }

  // Check if JWT secret is configured
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured!');
  }

  // Find administrator account using email
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND role = 'admin'",
    [email.trim()]
  );

  // Check if administrator account exists
  if (rows.length === 0) {
    throw new Error('Invalid email or password!');
  }

  const admin = rows[0];

  // Verify administrator password
  const isPasswordValid = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isPasswordValid) {
    throw new Error('Invalid email or password!');
  }

  // Create authentication token
  const token = jwt.sign(
    {
      user_id: admin.user_id,
      role: admin.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }
  );

  // Return safe administrator information and token
  return {
    token,
    user: {
      user_id: admin.user_id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  };
};
