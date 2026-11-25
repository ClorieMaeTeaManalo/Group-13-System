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


// Get all reservation records with customer information
export const getAllReservations = async () => {
  const [reservations] = await pool.query(`
    SELECT
      reservations.reservation_id,
      reservations.customer_id,
      customers.name AS customer_name,
      customers.email AS customer_email,
      customers.contact_number,
      reservations.check_in,
      reservations.check_out,
      reservations.guests,
      reservations.special_requests,
      reservations.status,
      reservations.created_at
    FROM reservations
    INNER JOIN customers
      ON reservations.customer_id = customers.customer_id
    ORDER BY reservations.created_at DESC
  `);

  return reservations;
};
