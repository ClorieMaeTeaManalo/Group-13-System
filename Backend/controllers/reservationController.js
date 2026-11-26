
import createReservation from "../services/reservationService.js";

// Submit customer reservation
export const submitReservation = async (req, res) => {
  try {
    const customerId = req.customer.customer_id;

    const reservationId = await createReservation(
      customerId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Reservation submitted successfully!",
      data: {
        reservation_id: reservationId,
        status: "pending"
      }
    });

  } catch (error) {
    console.error("Reservation Submission Error:", error);

    const validationErrors = [
      "Check-in date, check-out date, and number of guests are required.",
      "Please enter valid check-in and check-out dates.",
      "Check-in date cannot be in the past.",
      "Check-out date must be after check-in date.",
      "Number of guests must be a positive whole number.",
      "Special requests must be valid text."
    ];

    const statusCode = validationErrors.includes(error.message)
      ? 400
      : 500;

    return res.status(statusCode).json({
      success: false,
      message: statusCode === 400
        ? error.message
        : "Something went wrong while submitting the reservation."
    });
  }
};
