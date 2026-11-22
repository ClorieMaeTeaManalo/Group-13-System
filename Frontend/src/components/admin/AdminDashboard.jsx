import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar.jsx';
import './AdminDashboard.css';
import beachImage from '../../assets/bella-beachh.jpg';
import backgroundImage from '../../assets/beach2.jpg';

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

// Store registered staff accounts
const [staffList, setStaffList] = useState([]);
const [staffListLoading, setStaffListLoading] = useState(false);
const [staffListError, setStaffListError] = useState('');

// Store staff directory search input
const [staffSearch, setStaffSearch] = useState('');

// Filter staff accounts by name or email
const filteredStaff = staffList.filter((staff) =>
  (staff.name || '').toLowerCase().includes(staffSearch.toLowerCase()) ||
  (staff.email || '').toLowerCase().includes(staffSearch.toLowerCase())
);

// Store the currently selected sidebar page
const [activePage, setActivePage] = useState('Dashboard');

// Fetch staff accounts when Staff Accounts page is opened
useEffect(() => {
  if (activePage === 'Staff Accounts') {
    fetchStaffAccounts();
  }
}, [activePage]);

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

    // Get all registered staff accounts
  const fetchStaffAccounts = async () => {
    setStaffListLoading(true);
    setStaffListError('');

    try {
      const response = await fetch(
        'http://localhost:3000/api/accounts/staff'
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to load staff accounts.');
      }

      setStaffList(result.staff);

    } catch (error) {
      console.error('Staff Accounts Error:', error);
      setStaffListError(error.message);
    } finally {
      setStaffListLoading(false);
    }
  };

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

      // Refresh staff table after successful account creation
      await fetchStaffAccounts();

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
     <main
  className="admin-content"
  style={
    activePage === 'Staff Accounts'
      ? {
          backgroundImage: `linear-gradient(rgba(247, 240, 228, 0.25), rgba(247, 240, 228, 0.25)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }
      : {}
  }
>

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

{activePage === 'Staff Accounts' && (
  <div className="staff-management-page">

    {/* Staff Management Header */}
    <div className="staff-page-header">
      <div>
        <p className="staff-header-label">BELLA BEACH RESORT</p>
        <h1>Staff Management</h1>
        <p>Manage and review all registered staff accounts.</p>
      </div>
    </div>

    {/* Total Staff Summary */}
    <div className="staff-summary-card">
      <div>
        <p>Total Staff Members</p>
        <h2>{staffListLoading ? '...' : staffList.length}</h2>
        <span>Registered staff accounts</span>
      </div>


    </div>

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

    {/* Staff Directory */}
    <div className="staff-list-section">  

  {/* Staff Directory Heading */}
  <div className="staff-directory-header">
    <div>
      <h2>Staff Directory</h2>
      <p>View and search all registered staff accounts.</p>
    </div>
  </div>

  {/* Search Staff */}
  <div className="staff-search-box">
    <input
      type="text"
      placeholder="Search by staff name or email..."
      value={staffSearch}
      onChange={(e) => setStaffSearch(e.target.value)}
    />
  </div>

        {staffListLoading ? (
          <p>Loading staff accounts...</p>
        ) : staffListError ? (
          <p className="staff-error">{staffListError}</p>
        ) : filteredStaff.length === 0 ? (
  <p>
    {staffSearch
      ? 'No matching staff accounts found.'
      : 'No staff accounts found.'}
  </p>
): (
          <table>
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date Created</th>
              </tr>
            </thead>

            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={staff.staff_id}>
                  <td>{staff.staff_id}</td>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.role}</td>
                  <td>
                    {new Date(staff.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      
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