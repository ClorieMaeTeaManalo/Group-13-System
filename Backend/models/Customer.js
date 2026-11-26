
import pool from "../config/db.js";

const Customer = {

  // Find customer using email
  async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT customer_id, name, email, contact_number,
              password, verification_status
       FROM customers
       WHERE email = ?`,
      [email]
    );

    return rows[0];
  },

  // Create new customer
  async create(customerData) {
    const {
      name,
      email,
      contact_number,
      password
    } = customerData;

    const [result] = await pool.query(
      `INSERT INTO customers
       (name, email, contact_number, password, verification_status)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, contact_number, password, "Pending"]
    );

    return result.insertId;
  },

  // Retrieve customer profile using customer ID
  async findProfileById(customerId) {
    const [rows] = await pool.query(
      `SELECT customer_id, name, email, contact_number
       FROM customers
       WHERE customer_id = ?`,
      [customerId]
    );

    return rows[0];
  },

  // Update customer profile
  async updateProfileById(customerId, profileData) {
    const { name, contact_number } = profileData;

    const [result] = await pool.query(
      `UPDATE customers
       SET name = ?, contact_number = ?
       WHERE customer_id = ?`,
      [name, contact_number, customerId]
    );

    return result.affectedRows;
  }

};

export default Customer;
