
import React, { useState } from "react";
import beachImage from "../../assets/bella-beach.jpg";
import "./CustomerLogin.css";

function CustomerLogin({ onLoginSuccess, onCreateAccount }) {
  // Store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store error and loading status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle customer login
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Send login details to the backend
      const response = await fetch(
        "http://localhost:3000/api/customers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      // Check login response
      if (!response.ok) {
        setError(data.message || "Invalid email or password!");
        return;
      }

      // Send customer information to App.jsx
      onLoginSuccess(data.customer);

    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-login-container">

      {/* Left side image */}
      <div
        className="customer-login-image"
        style={{ backgroundImage: `url(${beachImage})` }}
      >
        <div className="customer-login-overlay">
          <h1>Bella Beach Resort</h1>
          <p>
            Escape the everyday and enjoy the beauty of the beach.
            Relax, recharge, and create unforgettable moments.
          </p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="customer-login-form-section">
        <div className="customer-login-form">

          <small>BELLA BEACH RESORT</small>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">
            Sign in to your Bella Beach Resort account.
          </p>

          <form onSubmit={handleLogin} autoComplete="off">

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            {/* Display login error */}
            {error && <p className="login-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <p className="create-account-text">
            Don't have an account?{" "}
            <span onClick={onCreateAccount}>
              Create Account
            </span>
          </p>

          <p className="login-footer">
            Bella Beach Resort Management System
          </p>

        </div>
      </div>

    </div>
  );
}

export default CustomerLogin;
