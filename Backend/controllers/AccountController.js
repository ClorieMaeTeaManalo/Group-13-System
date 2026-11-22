import * as AccountService from '../services/AccountService.js';

// Create staff account
export const createStaffAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const staff = await AccountService.createStaffAccount(
      name,
      email,
      password
    );

    return res.status(201).json({
      success: true,
      message: 'Staff account created successfully!',
      staff
    });

  } catch (error) {

    if (
      error.message === 'Name, email, and password are required.' ||
      error.message === 'Email address is already registered.'
    ) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    console.error('Create Staff Account Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Get all staff accounts
export const getAllStaffAccounts = async (req, res) => {
  try {
    const staff = await AccountService.getAllStaffAccounts();

    return res.status(200).json({
      success: true,
      message: 'Staff accounts retrieved successfully!',
      staff
    });

  } catch (error) {
    console.error('Get Staff Accounts Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

 // Delete staff account
export const deleteStaffAccount = async (req, res) => {
  try {
    const { staffId } = req.params;

    const result = await AccountService.deleteStaffAccount(staffId);

    return res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

