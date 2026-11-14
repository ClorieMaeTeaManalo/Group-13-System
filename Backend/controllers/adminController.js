import * as adminService from '../services/adminService.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await adminService.getAllStaff();

    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create staff account
export const createStaff = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const staffId = await adminService.createStaff(
      name,
      email,
      password,
      phone
    );

    res.status(201).json({
      success: true,
      message: 'Staff account created successfully!',
      staffId
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete staff account
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    await adminService.deleteStaff(id);

    res.status(200).json({
      success: true,
      message: 'Staff account deleted successfully!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all reservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await adminService.getAllReservations();

    res.status(200).json({
      success: true,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update reservation status
export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await adminService.updateReservationStatus(id, status);

    res.status(200).json({
      success: true,
      message: 'Reservation status updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get cleaning reports
export const getCleaningReports = async (req, res) => {
  try {
    const reports = await adminService.getCleaningReports();

    res.status(200).json({
      success: true,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get maintenance reports
export const getMaintenanceReports = async (req, res) => {
  try {
    const reports = await adminService.getMaintenanceReports();

    res.status(200).json({
      success: true,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
