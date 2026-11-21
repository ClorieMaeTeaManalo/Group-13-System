import React, { useState } from 'react';
import './AdminLogin.css';
import beachImage from '../../assets/bella-beach.jpg';

function MainLogin({ onLoginSuccess }) {

  // Store form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Show or hide password
const [showPassword, setShowPassword] = useState(false);

  // Store login status and messages
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle administrator and customer login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try administrator login first
      const adminResponse = await fetch(
        'http://localhost:3000/api/admin-auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const adminData = await adminResponse.json();

      // If administrator login is successful
      if (adminResponse.ok) {
        onLoginSuccess(adminData.admin);
        return;
      }

      // Do not continue if there is a server or validation error
      if (adminResponse.status !== 401) {
        setError(adminData.message || 'Login failed.');
        return;
      }

      // If not an administrator, try customer login
      const customerResponse = await fetch(
        'http://localhost:3000/api/customers/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const customerData = await customerResponse.json();

      // If customer login is successful
      if (customerResponse.ok) {
        onLoginSuccess(customerData.customer);
        return;
      }

      // Display login error
      setError(customerData.message || 'Invalid email or password.');

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
            <p>
              Escape the everyday and enjoy the beauty of the beach.
              Relax, recharge, and create unforgettable moments.
            </p>
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

             <div className="password-input-container">
                <input
               id="password"
               type={showPassword ? 'text' : 'password'}
               placeholder="Enter your password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               />

        <button
  type="button"
  className="toggle-password"
  onClick={() => setShowPassword(!showPassword)}
  aria-label={showPassword ? 'Hide password' : 'Show password'}
>
  {showPassword ? (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 3l18 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )}
</button>
</div>

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