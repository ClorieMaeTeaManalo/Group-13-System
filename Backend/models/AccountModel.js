import pool from '../config/db.js';

// Check if staff email already exists
export const findStaffByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM staff WHERE email = ?',
    [email]
  );

  return rows[0];
};

// Save new staff account
export const createStaff = async (name, email, password) => {
  const [result] = await pool.query(
    `INSERT INTO staff (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, password, 'staff']
  );

  return result.insertId;
};

// Get all staff accounts
export const getAllStaff = async () => {
  const [rows] = await pool.query(
    `SELECT staff_id, name, email, role, created_at
     FROM staff
     ORDER BY staff_id DESC`
  );

  return rows;
};
