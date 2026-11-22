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