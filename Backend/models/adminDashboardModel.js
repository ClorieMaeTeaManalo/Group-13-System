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

// Update the status of a reservation
export const updateReservationStatus = async (reservationId, status) => {
  // Check if the reservation exists
  const [rows] = await pool.query(
    'SELECT reservation_id FROM reservations WHERE reservation_id = ?',
    [reservationId]
  );

  if (rows.length === 0) {
    return false;
  }

  // Update the reservation status
  await pool.query(
    'UPDATE reservations SET status = ? WHERE reservation_id = ?',
    [status, reservationId]
  );

  return true;
};

// Automatically create cleaning requests for reservations
// that have reached their checkout date
export const createAutomaticCleaningRequests = async () => {
  await pool.query(`
    INSERT INTO cleaning_reports (
      reservation_id,
      staff_id,
      description,
      status
    )
    SELECT
      r.reservation_id,
      NULL,
      'Automatic cleaning request after checkout',
      'pending'
    FROM reservations r
    WHERE r.check_out <= CURDATE()
      AND r.status IN ('confirmed', 'completed')
      AND NOT EXISTS (
        SELECT 1
        FROM cleaning_reports cr
        WHERE cr.reservation_id = r.reservation_id
      )
  `);
};

// Get all cleaning requests
export const getAllCleaningRequests = async () => {
  const [cleaningRequests] = await pool.query(`
    SELECT
      cr.cleaning_id,
      cr.reservation_id,
      c.name AS customer_name,
      c.email AS customer_email,
      r.check_in,
      r.check_out,
      r.guests,
      s.staff_id,
      s.name AS staff_name,
      cr.description,
      cr.status,
      cr.completed_at,
      cr.created_at
    FROM cleaning_reports cr
    INNER JOIN reservations r
      ON cr.reservation_id = r.reservation_id
    INNER JOIN customers c
      ON r.customer_id = c.customer_id
    LEFT JOIN staff s
      ON cr.staff_id = s.staff_id
    ORDER BY cr.created_at DESC
  `);

  return cleaningRequests;
};