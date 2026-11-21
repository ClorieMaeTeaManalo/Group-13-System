import React, { useState } from "react";
import "./CustomerRegistration.css";
import beachImage from "../../assets/bella-beach.jpg";

function CustomerRegistration({ onBackToLogin, onRegisterSuccess }) {

  // Store customer information
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    password: ""
  });

  // Store response messages and loading status
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit customer registration
  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      // Send registration data to backend
      const response = await fetch(
        "http://localhost:3000/api/customers/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      // Read backend response
      const data = await response.json();

      // Display registration errors
      if (!response.ok) {
        setMessage(data.message || "Registration failed.");
        setMessageType("error");
        return;
      }

      // Pass registered customer information to App.jsx
      onRegisterSuccess(data.data);

    } catch (error) {
      // Handle connection errors
      setMessage("Unable to connect to the server.");
      setMessageType("error");

    } finally {
      // Stop loading indicator
      setLoading(false);
    }
  };

  return (
    <main className="customer-register-page">
      <section className="customer-register-container">

        {/* Beach image section */}
        <div className="customer-register-image">
          <img src={beachImage} alt="Bella Beach Resort" />

          <div className="customer-image-overlay">
            <h1>Bella Beach Resort</h1>
            <p>
              Escape the everyday and enjoy the beauty of the beach.
              Relax, recharge, and create unforgettable moments.
            </p>
          </div>
        </div>

        {/* Registration form section */}
        <div className="customer-register-content">

          <span className="customer-register-label">
            BELLA BEACH RESORT
          </span>

          <h2>Create Account</h2>

          <p className="customer-register-subtitle">
            Register your account and enjoy your stay with us.
          </p>

          {/* Customer registration form */}
          <form onSubmit={handleRegister} autoComplete="off">

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            <label>Contact Number</label>
            <input
              type="tel"
              name="contact_number"
              placeholder="Enter your contact number"
              value={formData.contact_number}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters and 1 special character"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              required
            />

            {/* Display error message */}
            {message && (
              <p className={`customer-register-message ${messageType}`}>
                {message}
              </p>
            )}

            {/* Submit registration */}
            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Return to login page */}
          <p className="customer-register-login">
            Already have an account?{" "}
            <button type="button" onClick={onBackToLogin}>
              Sign In
            </button>
          </p>

          {/* Page footer */}
          <p className="customer-register-footer">
            Bella Beach Resort Management System
          </p>

        </div>
      </section>
    </main>
  );
}

export default CustomerRegistration;