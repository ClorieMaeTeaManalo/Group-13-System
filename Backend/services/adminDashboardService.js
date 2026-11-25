import * as adminDashboardModel from '../models/adminDashboardModel.js';

// Get administrator dashboard summary
export const getDashboardSummary = async () => {
  return await adminDashboardModel.getDashboardSummary();
};

// Get all reservation records
export const getAllReservations = async () => {
  return await adminDashboardModel.getAllReservations();
};
