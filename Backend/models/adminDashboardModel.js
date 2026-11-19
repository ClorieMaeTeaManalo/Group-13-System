import pool from '../config/db.js';

// Get dashboard summary from the database
export const getDashboardSummary = async () => {

  // Count all reservations
  const [totalReservations] = await pool.query(
    'SELECT COUNT(*) AS total FROM reservations'
  );

  // Count pending reservations
  const [pendingReservations] = await pool.query(
    "SELECT COUNT(*) AS total FROM reservations WHERE status = 'pending'"
  );

  // Count cleaning requests
  const [cleaningRequests] = await pool.query(
    'SELECT COUNT(*) AS total FROM cleaning_reports'
  );

  // Count maintenance reports
  const [maintenanceReports] = await pool.query(
    'SELECT COUNT(*) AS total FROM maintenance_reports'
  );

  // Return dashboard summary
  return {
    totalReservations: totalReservations[0].total,
    pendingReservations: pendingReservations[0].total,
    cleaningRequests: cleaningRequests[0].total,
    maintenanceReports: maintenanceReports[0].total
  };
};
