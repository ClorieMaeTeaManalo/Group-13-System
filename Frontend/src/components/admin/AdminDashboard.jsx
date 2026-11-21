import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar.jsx';
import './AdminDashboard.css';
import beachImage from '../../assets/bella-beachh.jpg';

function AdminDashboard() {
  // Store dashboard summary
  const [summary, setSummary] = useState({
    totalReservations: 0,
    pendingReservations: 0,
    cleaningRequests: 0,
    maintenanceReports: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Store staff account form values
const [staffName, setStaffName] = useState('');
const [staffEmail, setStaffEmail] = useState('');
const [staffPassword, setStaffPassword] = useState('');

// Store staff account creation status
const [staffMessage, setStaffMessage] = useState('');
const [staffError, setStaffError] = useState('');
const [staffLoading, setStaffLoading] = useState(false);

// Store the currently selected sidebar page
const [activePage, setActivePage] = useState('Dashboard');

  // Get dashboard data from the backend
  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/admin-dashboard/summary'
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error('Failed to load dashboard summary.');
        }

        setSummary(result.data);
      } catch (error) {
        console.error('Dashboard Error:', error);
        setError('Unable to load dashboard information.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

    // Create staff account
  const handleCreateStaff = async (e) => {
    e.preventDefault();

    setStaffMessage('');
    setStaffError('');
    setStaffLoading(true);

    try {
      const response = await fetch(
        'http://localhost:3000/api/accounts/create-staff',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: staffName,
            email: staffEmail,
            password: staffPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to create staff account.');
      }

      setStaffMessage('Staff account created successfully!');

      // Clear form fields
      setStaffName('');
      setStaffEmail('');
      setStaffPassword('');

    } catch (error) {
      setStaffError(error.message);
    } finally {
      setStaffLoading(false);
    }
  };

  return (
    <div className="admin-layout">
     <AdminSidebar
  activePage={activePage}
  onPageChange={setActivePage}
/>
      <main className="admin-content">

  {/* Display Dashboard Page */}
  {activePage === 'Dashboard' && (
    <>
      {/* Welcome Banner */}
      <div
        className="dashboard-banner"
        style={{ backgroundImage: `url(${beachImage})` }}
      >
        <div className="banner-overlay">
          <p className="banner-subtitle">WELCOME TO</p>
          <h1>Bella Beach Resort</h1>
          <p className="banner-description">
            Welcome back, Administrator!
          </p>
        </div>
      </div>

      {/* Display Dashboard Summary */}
      {loading ? (
        <p>Loading dashboard information...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="dashboard-cards">

          {/* Total Reservations Card */}
          <div className="dashboard-card">
            <h3>Total Reservations</h3>
            <h2>{summary.totalReservations}</h2>
          </div>

          {/* Pending Reservations Card */}
          <div className="dashboard-card">
            <h3>Pending Reservations</h3>
            <h2>{summary.pendingReservations}</h2>
          </div>

          {/* Cleaning Requests Card */}
          <div className="dashboard-card">
            <h3>Cleaning Requests</h3>
            <h2>{summary.cleaningRequests}</h2>
          </div>

          {/* Maintenance Reports Card */}
          <div className="dashboard-card">
            <h3>Maintenance Reports</h3>
            <h2>{summary.maintenanceReports}</h2>
          </div>

        </div>
      )}
    </>
  )}

  {/* Display Staff Accounts Page */}
  {activePage === 'Staff Accounts' && (
    <div className="staff-account-section">

      {/* Staff Account Form Heading */}
      <h2>Create Staff Account</h2>
      <p>Enter the staff information to create a new account.</p>

      {/* Staff Account Form */}
      <form onSubmit={handleCreateStaff}>

        {/* Staff Name Input */}
        <label>Staff Name</label>
        <input
          type="text"
          placeholder="Enter staff name"
          value={staffName}
          onChange={(e) => setStaffName(e.target.value)}
          required
        />

        {/* Staff Email Input */}
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter staff email"
          value={staffEmail}
          onChange={(e) => setStaffEmail(e.target.value)}
          required
        />

        {/* Staff Password Input */}
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter staff password"
          value={staffPassword}
          onChange={(e) => setStaffPassword(e.target.value)}
          required
        />

        {/* Display Success Message */}
        {staffMessage && (
          <p className="staff-success">{staffMessage}</p>
        )}

        {/* Display Error Message */}
        {staffError && (
          <p className="staff-error">{staffError}</p>
        )}

        {/* Submit Staff Account Form */}
        <button type="submit" disabled={staffLoading}>
          {staffLoading ? 'Creating Account...' : 'Create Staff Account'}
        </button>

    
      </form>

      
      </div>
  )}


  {/* Display Other Admin Pages */}
  {activePage !== 'Dashboard' && activePage !== 'Staff Accounts' && (
    <h2>{activePage}</h2>
  )}

</main>
    </div>
  );
}

export default AdminDashboard;