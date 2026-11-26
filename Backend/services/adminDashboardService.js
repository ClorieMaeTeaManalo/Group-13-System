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

// Assign staff to a cleaning request
export const assignStaffToCleaningRequest = async (cleaningId, staffId) => {

  // Validate cleaning request ID
  if (!Number.isInteger(Number(cleaningId)) || Number(cleaningId) <= 0) {
    throw new Error('Invalid cleaning request ID.');
  }

  // Validate staff ID
  if (!Number.isInteger(Number(staffId)) || Number(staffId) <= 0) {
    throw new Error('Invalid staff ID.');
  }

  // Assign staff to cleaning request
  const assigned = await adminDashboardModel.assignStaffToCleaningRequest(
    Number(cleaningId),
    Number(staffId)
  );

  // Check if cleaning request exists
  if (!assigned) {
    throw new Error('Cleaning request not found.');
  }

  return true;
};

// Get all maintenance reports
export const getAllMaintenanceReports = async () => {
  return await adminDashboardModel.getAllMaintenanceReports();
};

// Update maintenance report status and admin notes
export const updateMaintenanceReport = async (
  maintenanceId,
  status,
  adminNotes
) => {
  // Check if the status is valid
  const validStatuses = ['pending', 'in_progress', 'resolved'];

  if (!validStatuses.includes(status)) {
    throw new Error('Invalid maintenance report status.');
  }

  // Update the maintenance report
  const updated = await adminDashboardModel.updateMaintenanceReport(
    maintenanceId,
    status,
    adminNotes
  );

  if (!updated) {
    throw new Error('Maintenance report not found.');
  }

  return true;
};