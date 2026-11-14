import bcrypt from 'bcrypt';
import * as adminModel from '../models/adminModel.js';

// Get all users
export const getAllUsers = async () => {
  return await adminModel.getAllUsers();
};

// Get all staff
export const getAllStaff = async () => {
  return await adminModel.getAllStaff();
};

// Create staff account
export const createStaff = async (name, email, password, phone) => {
  if (!name || !email || !password) {
    throw new Error('Name, email and password are required!');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    return await adminModel.createStaff(
      name,
      email,
      hashedPassword,
      phone || null
    );
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email is already registered!');
    }

    throw error;
  }
};

// Delete staff account
export const deleteStaff = async (user_id) => {
  if (!user_id || isNaN(Number(user_id))) {
    throw new Error('Valid staff ID is required!');
  }

  const result = await adminModel.deleteStaff(user_id);

  if (!result) {
    throw new Error('Staff account not found!');
  }

  return result;
};

// Get all reservations
export const getAllReservations = async () => {
  return await adminModel.getAllReservations();
};

// Update reservation status
export const updateReservationStatus = async (reservation_id, status) => {
  const allowedStatuses = [
    'pending',
    'confirmed',
    'cancelled',
    'completed'
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error('Invalid reservation status!');
  }

  return await adminModel.updateReservationStatus(
    reservation_id,
    status
  );
};

// Get cleaning reports
export const getCleaningReports = async () => {
  return await adminModel.getCleaningReports();
};

// Get maintenance reports
export const getMaintenanceReports = async () => {
  return await adminModel.getMaintenanceReports();
};