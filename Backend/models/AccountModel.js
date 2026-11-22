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

// Get all staff accounts without password values
export const getAllStaffAccounts = async () => {
  const [rows] = await pool.query(
    `SELECT staff_id, name, email, role, created_at
     FROM staff
     ORDER BY staff_id DESC`
  );

  return rows;
};


 // Find staff account by ID
export const findStaffById = async (staffId) => {
  const [rows] = await pool.query(
    'SELECT staff_id, role FROM staff WHERE staff_id = ?',
    [staffId]
  );

  return rows[0];
};


// Delete a staff account using its ID
export const deleteStaffAccount = async (staffId) => {
  const [result] = await pool.query(
    'DELETE FROM staff WHERE staff_id = ? AND role = ?',
    [staffId, 'staff']
  );

  return result.affectedRows;
};



