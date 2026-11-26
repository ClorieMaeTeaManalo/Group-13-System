
import Reservation from "../models/Reservation.js";

// Validate and create customer reservation
const createReservation = async (customerId, reservationData) => {
  const {
    check_in,
    check_out,
    guests,
    special_requests
  } = reservationData;

  // Validate required fields
  if (!check_in || !check_out || guests === undefined || guests === null) {
    throw new Error("Check-in date, check-out date, and number of guests are required.");
  }

  // Validate date format and actual calendar dates
  const isValidDate = (date) => {
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return false;
    }

    const parsedDate = new Date(`${date}T00:00:00Z`);

    return !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.toISOString().slice(0, 10) === date;
  };

  if (!isValidDate(check_in) || !isValidDate(check_out)) {
    throw new Error("Please enter valid check-in and check-out dates.");
  }

  // Check-in must not be in the past
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  if (check_in < todayString) {
    throw new Error("Check-in date cannot be in the past.");
  }

  // Check-out must be after check-in
  if (check_out <= check_in) {
    throw new Error("Check-out date must be after check-in date.");
  }

  // Validate number of guests
  if (!Number.isInteger(Number(guests)) || Number(guests) <= 0) {
    throw new Error("Number of guests must be a positive whole number.");
  }

  // Validate special requests
  if (
    special_requests !== undefined &&
    special_requests !== null &&
    typeof special_requests !== "string"
  ) {
    throw new Error("Special requests must be valid text.");
  }

  // Save reservation
  const reservationId = await Reservation.create({
    customer_id: customerId,
    check_in,
    check_out,
    guests: Number(guests),
    special_requests: special_requests?.trim() || ""
  });

  return reservationId;
};

export default createReservation;
