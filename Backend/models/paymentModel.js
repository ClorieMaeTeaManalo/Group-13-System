import pool from '../config/db.js';

// Get all resort payment information
export const getPaymentInfo = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM resort_payment_info ORDER BY payment_id ASC'
  );

  return rows;
};

// Save or update a payment method
export const savePaymentInfo = async (
  paymentMethod,
  accountName,
  accountNumber,
  qrImage
) => {

  // Check if the selected payment method already exists
  const [rows] = await pool.query(
    'SELECT payment_id FROM resort_payment_info WHERE payment_method = ?',
    [paymentMethod]
  );

  if (rows.length > 0) {

    // Update the existing payment method
    await pool.query(
      `UPDATE resort_payment_info
       SET account_name = ?,
           account_number = ?,
           qr_image = ?
       WHERE payment_method = ?`,
      [accountName, accountNumber, qrImage, paymentMethod]
    );

  } else {

    // Add a new payment method
    await pool.query(
      `INSERT INTO resort_payment_info
       (payment_method, account_name, account_number, qr_image)
       VALUES (?, ?, ?, ?)`,
      [paymentMethod, accountName, accountNumber, qrImage]
    );

  }

  return true;
};
