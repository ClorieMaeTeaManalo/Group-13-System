import bcrypt from 'bcrypt';
import * as AccountModel from '../models/AccountModel.js';

// Create staff account
export const createStaffAccount = async (name, email, password) => {

  // Validate required fields
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required.');
  }

  // Check if email already exists
  const existingStaff = await AccountModel.findStaffByEmail(
    email.trim().toLowerCase()
  );

  if (existingStaff) {
    throw new Error('Email address is already registered.');
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save staff account
  const staffId = await AccountModel.createStaff(
    name.trim(),
    email.trim().toLowerCase(),
    hashedPassword
  );

  return {
    staff_id: staffId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: 'staff'
  };
};

// Get all staff accounts
export const getAllStaffAccounts = async () => {
  return await AccountModel.getAllStaffAccounts();
};



 // Delete staff account
export const deleteStaffAccount = async (staffId) => {
  // Validate staff ID
  if (!staffId || !Number.isInteger(Number(staffId)) || Number(staffId) <= 0) {
    throw new Error('Invalid staff account ID.');
  }

  // Find the selected staff account
  const existingStaff = await AccountModel.findStaffById(staffId);

  // Check if account exists
  if (!existingStaff) {
    throw new Error('Staff account not found.');
  }

  // Check if account belongs to staff role
  if (existingStaff.role !== 'staff') {
    throw new Error('Only staff accounts can be deleted.');
  }

  // Delete staff account
  await AccountModel.deleteStaffAccount(staffId);

  return {
    message: 'Staff account deleted successfully.'
  };
};