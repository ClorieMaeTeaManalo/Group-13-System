
import React, { useState } from "react";

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
    <main style={{
      minHeight: "100vh",
      background: "#F4F5EF",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif"
    }}>

      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "white",
        padding: "30px",
        borderRadius: "12px"
      }}>

        <h1>Make a Reservation</h1>

        <p>Enter your preferred reservation details.</p>

        {message && (
          <p style={{
            color: reservation ? "green" : "red",
            fontWeight: "bold"
          }}>
            {message}
          </p>
        )}

        {reservation && (
          <p>
            Reservation ID: {reservation.reservation_id}
            <br />
            Status: {reservation.status}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: "20px" }}>
            <label>Check-in Date:</label>
            <input
              type="date"
              name="check_in"
              min={minDate}
              value={formData.check_in}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", padding: "10px", marginTop: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Check-out Date:</label>
            <input
              type="date"
              name="check_out"
              min={formData.check_in || minDate}
              value={formData.check_out}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", padding: "10px", marginTop: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Number of Guests:</label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", padding: "10px", marginTop: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Special Requests:</label>
            <textarea
              name="special_requests"
              value={formData.special_requests}
              onChange={handleChange}
              placeholder="Enter any special requests (optional)"
              rows="4"
              style={{ display: "block", width: "100%", padding: "10px", marginTop: "8px" }}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "12px 20px",
              background: "#203D32",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {saving ? "Submitting..." : "Submit Reservation"}
          </button>

          <button
            type="button"
            onClick={onBack}
            style={{
              padding: "12px 20px",
              marginLeft: "10px",
              background: "#647C5D",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Back
          </button>

        </form>

      </div>
    </main>
  );
}

export default CustomerReservation;
