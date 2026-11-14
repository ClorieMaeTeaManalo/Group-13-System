import pool from '../config/db.js';

// Get all users
export const getAllUsers = async () => {
  const [rows] = await pool.query(
    'SELECT user_id, name, email, role, phone, created_at FROM users'
  );

  return rows;
};

// Get all staff accounts
export const getAllStaff = async () => {
  const [rows] = await pool.query(
    "SELECT user_id, name, email, phone, created_at FROM users WHERE role = 'staff'"
  );

  return rows;
};

// Create staff account
export const createStaff = async (name, email, password, phone) => {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password, role, phone)
     VALUES (?, ?, ?, 'staff', ?)`,
    [name, email, password, phone]
  );

  return result.insertId;
};

// Delete staff account
export const deleteStaff = async (user_id) => {
  const [result] = await pool.query(
    "DELETE FROM users WHERE user_id = ? AND role = 'staff'",
    [user_id]
  );

  return result.affectedRows;
};

// Get all reservations
export const getAllReservations = async () => {
  const [rows] = await pool.query(
    `SELECT reservations.*, users.name, users.email
     FROM reservations
     INNER JOIN users ON reservations.user_id = users.user_id
     ORDER BY reservations.created_at DESC`
  );

  return rows;
};

// Update reservation status
export const updateReservationStatus = async (reservation_id, status) => {
  const [result] = await pool.query(
    'UPDATE reservations SET status = ? WHERE reservation_id = ?',
    [status, reservation_id]
  );

  return result.affectedRows;
};

// Get cleaning reports
export const getCleaningReports = async () => {
  const [rows] = await pool.query(
    `SELECT cleaning_reports.*, users.name AS staff_name
     FROM cleaning_reports
     INNER JOIN users ON cleaning_reports.staff_id = users.user_id
     ORDER BY cleaning_reports.created_at DESC`
  );

  return rows;
};

// Get maintenance reports
export const getMaintenanceReports = async () => {
  const [rows] = await pool.query(
    `SELECT maintenance_reports.*, users.name AS staff_name
     FROM maintenance_reports
     INNER JOIN users ON maintenance_reports.staff_id = users.user_id
     ORDER BY maintenance_reports.created_at DESC`
  );

  return rows;
};