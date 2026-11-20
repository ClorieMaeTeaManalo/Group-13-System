
import pool from "../config/db.js";

const Customer = {
  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT customer_id FROM customers WHERE email = ?",
      [email]
    );

    return rows[0];
  },

  async create(customerData) {
    const { name, email, contact_number, password } = customerData;

    const [result] = await pool.query(
      `INSERT INTO customers
      (name, email, contact_number, password)
      VALUES (?, ?, ?, ?)`,
      [name, email, contact_number, password]
    );

    return result.insertId;
  }
};

export default Customer;
