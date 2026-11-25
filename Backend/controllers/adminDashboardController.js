import * as adminDashboardService from '../services/adminDashboardService.js';

// Get administrator dashboard summary
export const getDashboardSummary = async (req, res) => {
  try {
    const summary = await adminDashboardService.getDashboardSummary();

    res.status(200).json({
      success: true,
      message: 'Dashboard summary retrieved successfully!',
      data: summary
    });

  } catch (error) {
    console.error('Dashboard Summary Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard summary.'
    });
  }
};

// Get all reservation records
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await adminDashboardService.getAllReservations();

    res.status(200).json({
      success: true,
      message: 'Reservation records retrieved successfully!',
      data: reservations
    });

  } catch (error) {
    console.error('Get Reservations Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reservation records.'
    });
  }
};
