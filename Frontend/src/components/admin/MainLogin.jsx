import React, { useState } from 'react';
import './AdminLogin.css';
import beachImage from '../../assets/bella-beach.jpg';

function MainLogin({ onLoginSuccess }) {

  // Store form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Store login status and messages
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send login details to the backend
      const response = await fetch(
        'http://localhost:3000/api/admin-auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      // Read the backend response
      const data = await response.json();

      // Display an error for invalid credentials
      if (!response.ok) {
        setError(data.message || 'Login failed.');
        return;
      }

      // Pass administrator details to App.jsx
      onLoginSuccess(data.admin);

    } catch (error) {
      // Handle server connection errors
      setError('Unable to connect to the server.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      {/* Main login container */}
      <section className="admin-login-container">

        {/* Beach image section */}
        <div className="admin-login-image">
          <img src={beachImage} alt="Bella Beach Resort" />

          <div className="image-overlay">
            <h1>Bella Beach Resort</h1>
            <p>Escape the everyday and enjoy the beauty of the beach.
  Relax, recharge, and create unforgettable moments.</p>
          </div>
        </div>

        {/* Login form section */}
        <div className="admin-login-form-section">
          <div className="admin-login-content">

            <span className="admin-label">
              BELLA BEACH RESORT
            </span>

            <h2>Welcome Back</h2>

            <p className="admin-subtitle">
              Sign in to your Bella Beach Resort account.
            </p>

            {/* Login form */}
            <form onSubmit={handleLogin}>

              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Display login errors */}
              {error && <p className="login-error">{error}</p>}

              {/* Submit login details */}
              <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

            </form>

            {/* Customer registration link */}
            <p className="admin-register-link">
              Don't have an account?{' '}
              <a href="/register">Create Account</a>
            </p>

            {/* Page footer */}
            <p className="admin-footer">
              Bella Beach Resort Management System
            </p>

          </div>
        </div>

      </section>
    </main>
  );
}

// Export component for App.jsx
export default MainLogin;
