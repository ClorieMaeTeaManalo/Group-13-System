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

// Update reservation status
export const updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    await adminDashboardService.updateReservationStatus(
      reservationId,
      status
    );

    res.status(200).json({
      success: true,
      message: 'Reservation status updated successfully!'
    });

  } catch (error) {
    console.error('Update Reservation Status Error:', error);

    const statusCode =
      error.message === 'Reservation not found.' ? 404 :
      error.message === 'Invalid reservation ID.' ||
      error.message === 'Invalid reservation status.' ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message || 'Failed to update reservation status.'
    });
  }
};

// Get all cleaning requests
export const getAllCleaningRequests = async (req, res) => {
  try {
    const cleaningRequests =
      await adminDashboardService.getAllCleaningRequests();

    res.status(200).json({
      success: true,
      message: 'Cleaning requests retrieved successfully!',
      data: cleaningRequests
    });

  } catch (error) {
    console.error('Get Cleaning Requests Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cleaning requests.'
    });
  }
};

// Assign staff to a cleaning request
export const assignStaffToCleaningRequestController = async (req, res) => {
  try {
    const { cleaningId } = req.params;
    const { staffId } = req.body;

    await adminDashboardService.assignStaffToCleaningRequest(
      cleaningId,
      staffId
    );

    res.status(200).json({
      success: true,
      message: 'Staff assigned successfully!'
    });

  } catch (error) {
    console.error('Assign Staff Error:', error);

    const statusCode =
      error.message === 'Cleaning request not found.' ||
      error.message === 'Staff member not found.' ? 404 :
      error.message === 'Invalid cleaning request ID.' ||
      error.message === 'Invalid staff ID.' ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message || 'Failed to assign staff.'
    });
  }
};