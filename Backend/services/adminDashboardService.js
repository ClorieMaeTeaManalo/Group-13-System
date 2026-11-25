import * as adminDashboardModel from '../models/adminDashboardModel.js';

// Get administrator dashboard summary
export const getDashboardSummary = async () => {
  return await adminDashboardModel.getDashboardSummary();
};

// Get all reservation records
export const getAllReservations = async () => {
  return await adminDashboardModel.getAllReservations();
};

// Update reservation status
export const updateReservationStatus = async (reservationId, status) => {
  const allowedStatuses = [
    'pending',
    'confirmed',
    'cancelled',
    'completed'
  ];

  // Check if reservation ID is valid
  if (!Number.isInteger(Number(reservationId)) || Number(reservationId) <= 0) {
    throw new Error('Invalid reservation ID.');
  }

  // Check if status is allowed
  if (!allowedStatuses.includes(status)) {
    throw new Error('Invalid reservation status.');
  }

  // Update reservation status
  const updated = await adminDashboardModel.updateReservationStatus(
    Number(reservationId),
    status
  );

  // Check if reservation exists
  if (!updated) {
    throw new Error('Reservation not found.');
  }

  return true;
};

// Get all cleaning requests
export const getAllCleaningRequests = async () => {
  // Create pending requests for reservations that reached checkout date
  await adminDashboardModel.createAutomaticCleaningRequests();

  // Retrieve all cleaning requests
  return await adminDashboardModel.getAllCleaningRequests();
};