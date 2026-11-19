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

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">

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

        {loading ? (
          <p>Loading dashboard information...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Total Reservations</h3>
              <h2>{summary.totalReservations}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Pending Reservations</h3>
              <h2>{summary.pendingReservations}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Cleaning Requests</h3>
              <h2>{summary.cleaningRequests}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Maintenance Reports</h3>
              <h2>{summary.maintenanceReports}</h2>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;