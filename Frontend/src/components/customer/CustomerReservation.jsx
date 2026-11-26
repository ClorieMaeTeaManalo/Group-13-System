
import React, { useState } from "react";
import "./CustomerReservation.css";

function CustomerReservation({ customer, onBack }) {

  const [formData, setFormData] = useState({
    check_in: "",
    check_out: "",
    guests: 1,
    special_requests: ""
  });

  const [message, setMessage] = useState("");
  const [reservation, setReservation] = useState(null);
  const [saving, setSaving] = useState(false);

  // Get today's date
  const today = new Date();
  const minDate =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Submit reservation
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setReservation(null);

      if (!formData.check_in || !formData.check_out) {
        throw new Error("Please select your check-in and check-out dates.");
      }

      if (formData.check_in < minDate) {
        throw new Error("Check-in date cannot be in the past.");
      }

      if (formData.check_out <= formData.check_in) {
        throw new Error("Check-out date must be after check-in date.");
      }

      if (
        !Number.isInteger(Number(formData.guests)) ||
        Number(formData.guests) < 1
      ) {
        throw new Error("Number of guests must be a positive whole number.");
      }

      const response = await fetch(
        "http://localhost:3000/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${customer.token}`
          },
          body: JSON.stringify({
            ...formData,
            guests: Number(formData.guests)
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Reservation submission failed.");
      }

      setReservation(result.data);
      setMessage(result.message);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="customer-reservation">

      <div className="reservation-container">

        <header className="reservation-header">
          <p className="reservation-subtitle">BELLA BEACH RESORT</p>
          <h1>Make a Reservation</h1>
          <p>
            Plan your stay with us. Enter your preferred reservation details below.
          </p>
        </header>

        <section className="reservation-card">

          <h2>Reservation Details</h2>
          <p className="reservation-description">
            Please complete the form to submit your reservation request.
          </p>

          {message && (
            <p className={`reservation-message ${reservation ? "success" : "error"}`}>
              {message}
            </p>
          )}

          {reservation && (
            <div className="reservation-result">
              <p>
                <strong>Reservation ID:</strong> {reservation.reservation_id}
              </p>
              <p>
                <strong>Status:</strong> {reservation.status}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="reservation-field">
              <label htmlFor="check_in">Check-in Date</label>
              <input
                id="check_in"
                type="date"
                name="check_in"
                min={minDate}
                value={formData.check_in}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="check_out">Check-out Date</label>
              <input
                id="check_out"
                type="date"
                name="check_out"
                min={formData.check_in || minDate}
                value={formData.check_out}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="guests">Number of Guests</label>
              <input
                id="guests"
                type="number"
                name="guests"
                min="1"
                step="1"
                value={formData.guests}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="special_requests">Special Requests</label>
              <textarea
                id="special_requests"
                name="special_requests"
                value={formData.special_requests}
                onChange={handleChange}
                placeholder="Enter any special requests (optional)"
                rows="4"
              />
            </div>

            <div className="reservation-buttons">

              <button
                type="submit"
                className="reservation-submit"
                disabled={saving}
              >
                {saving ? "Submitting..." : "Submit Reservation"}
              </button>

              <button
                type="button"
                className="reservation-back"
                onClick={onBack}
              >
                Back
              </button>

            </div>

          </form>

        </section>

      </div>

    </main>
  );
}

export default CustomerReservation;
