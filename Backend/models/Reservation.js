
import pool from "../config/db.js";

const Reservation = {

  // Create new reservation
  async create(reservationData) {
    const {
      customer_id,
      check_in,
      check_out,
      guests,
      special_requests
    } = reservationData;

    const [result] = await pool.query(
      `INSERT INTO reservations
       (customer_id, check_in, check_out, guests, special_requests, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customer_id,
        check_in,
        check_out,
        guests,
        special_requests,
        "pending"
      ]
    );

    return result.insertId;
  }

};

export default Reservation;
