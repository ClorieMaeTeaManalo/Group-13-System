import * as adminDashboardModel from '../models/adminDashboardModel.js';

// Get administrator dashboard summary
export const getDashboardSummary = async () => {
  return await adminDashboardModel.getDashboardSummary();
};