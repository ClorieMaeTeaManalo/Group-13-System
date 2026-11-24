
import pool from "../config/db.js";

const Customer = {

  // Find customer account using email
  async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT
        customer_id,
        name,
        email,
        contact_number,
        password,
        verification_status
      FROM customers
      WHERE email = ?`,
      [email]
    );

    return rows[0];
  },

  // Create new customer account
  async create(customerData) {
    const { name, email, contact_number, password } = customerData;

    const [result] = await pool.query(
      `INSERT INTO customers
      (name, email, contact_number, password, verification_status)
      VALUES (?, ?, ?, ?, ?)`,
      [name, email, contact_number, password, "Pending"]
    );

    return result.insertId;
  }

};

export default Customer;
