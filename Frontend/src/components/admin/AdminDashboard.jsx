import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar.jsx';
import './AdminDashboard.css';
import beachImage from '../../assets/bella-beachh.jpg';
import backgroundImage from '../../assets/beach2.jpg';

function AdminDashboard({ onLogout }) {
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

  // Store selected staff account for deletion
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  // Control delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Store staff directory search input
  const [staffSearch, setStaffSearch] = useState('');

  // Store the currently selected sidebar page
  const [activePage, setActivePage] = useState('Dashboard');

  // Store reservation records
  const [reservationList, setReservationList] = useState([]);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [reservationError, setReservationError] = useState('');

  // Store cleaning request records
  const [cleaningRequestList, setCleaningRequestList] = useState([]);
  const [cleaningRequestLoading, setCleaningRequestLoading] = useState(false);
  const [cleaningRequestError, setCleaningRequestError] = useState('');

  // Store selected staff for each cleaning request
  const [selectedCleaningStaff, setSelectedCleaningStaff] = useState({});

  // Store staff assignment messages
  const [assignMessage, setAssignMessage] = useState('');
  const [assignError, setAssignError] = useState('');
  const [assignLoading, setAssignLoading] = useState(null);

  // Store reservation status update messages
  const [statusMessage, setStatusMessage] = useState('');
  const [statusError, setStatusError] = useState('');
  const [statusLoading, setStatusLoading] = useState(null);

  // Store maintenance report records
  const [maintenanceReportList, setMaintenanceReportList] = useState([]);
  const [maintenanceReportLoading, setMaintenanceReportLoading] = useState(false);
  const [maintenanceReportError, setMaintenanceReportError] = useState('');

  // Store selected maintenance report details
  const [selectedMaintenanceReport, setSelectedMaintenanceReport] = useState(null);

  // Store maintenance report update values
const [maintenanceStatus, setMaintenanceStatus] = useState('pending');
const [maintenanceNotes, setMaintenanceNotes] = useState('');
const [maintenanceUpdateMessage, setMaintenanceUpdateMessage] = useState('');
const [maintenanceUpdateError, setMaintenanceUpdateError] = useState('');
const [maintenanceUpdateLoading, setMaintenanceUpdateLoading] = useState(false);

  // Count cleaning requests based on their status
  const pendingCleaningCount = cleaningRequestList.filter(
    (request) => request.status === 'pending'
  ).length;

  const inProgressCleaningCount = cleaningRequestList.filter(
    (request) => request.status === 'in_progress'
  ).length;

  const completedCleaningCount = cleaningRequestList.filter(
    (request) => request.status === 'completed'
  ).length;
  // Count maintenance reports based on their status
const pendingMaintenanceCount = maintenanceReportList.filter(
  (report) => report.status === 'pending'
).length;

const inProgressMaintenanceCount = maintenanceReportList.filter(
  (report) => report.status === 'in_progress'
).length;

const resolvedMaintenanceCount = maintenanceReportList.filter(
  (report) => report.status === 'resolved'
).length;

  // Filter staff accounts by name or email
  const filteredStaff = staffList.filter(
    (staff) =>
      (staff.name || '').toLowerCase().includes(staffSearch.toLowerCase()) ||
      (staff.email || '').toLowerCase().includes(staffSearch.toLowerCase())
  );

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

  // Get all reservation records
  const fetchReservations = async () => {
    setReservationLoading(true);
    setReservationError('');

    try {
      const response = await fetch(
        'http://localhost:3000/api/admin-dashboard/reservations'
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to load reservations.');
      }

      setReservationList(result.data);
    } catch (error) {
      console.error('Reservations Error:', error);
      setReservationError(error.message);
    } finally {
      setReservationLoading(false);
    }
  };

  // Get all cleaning request records
  const fetchCleaningRequests = async () => {
    setCleaningRequestLoading(true);
    setCleaningRequestError('');

    try {
      const response = await fetch(
        'http://localhost:3000/api/admin-dashboard/cleaning-requests'
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to load cleaning requests.');
      }

      setCleaningRequestList(result.data);
    } catch (error) {
      console.error('Cleaning Requests Error:', error);
      setCleaningRequestError(error.message);
    } finally {
      setCleaningRequestLoading(false);
    }
  };

  // Fetch maintenance reports from the backend
  const fetchMaintenanceReports = async () => {
    setMaintenanceReportLoading(true);
    setMaintenanceReportError('');

    try {
      const response = await fetch(
        'http://localhost:3000/api/admin-dashboard/maintenance-reports'
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Failed to load maintenance reports.'
        );
      }

      setMaintenanceReportList(result.data);
    } catch (error) {
      console.error('Fetch Maintenance Reports Error:', error);
      setMaintenanceReportError(error.message);
    } finally {
      setMaintenanceReportLoading(false);
    }
  };

  // Update reservation status
  const handleUpdateReservationStatus = async (reservationId, status) => {
    setStatusMessage('');
    setStatusError('');
    setStatusLoading(reservationId);

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin-dashboard/reservations/${reservationId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Failed to update reservation status.'
        );
      }

      setStatusMessage(result.message);

      // Refresh reservation records after successful update
      await fetchReservations();
    } catch (error) {
      console.error('Update Reservation Status Error:', error);
      setStatusError(error.message);
    } finally {
      setStatusLoading(null);
    }
  };

  // Assign staff to a cleaning request
  const handleAssignStaff = async (cleaningId) => {
    const staffId = selectedCleaningStaff[cleaningId];

    if (!staffId) {
      setAssignError('Please select a staff member.');
      setAssignMessage('');
      return;
    }

    setAssignMessage('');
    setAssignError('');
    setAssignLoading(cleaningId);

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin-dashboard/cleaning-requests/${cleaningId}/assign`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            staffId: Number(staffId)
          })
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to assign staff.');
      }

      setAssignMessage('Staff assigned successfully!');

      // Refresh cleaning requests to display the assigned staff
      await fetchCleaningRequests();
    } catch (error) {
      console.error('Assign Staff Error:', error);
      setAssignError(error.message);
    } finally {
      setAssignLoading(null);
    }
  };
  // Update maintenance report status and admin notes
const handleUpdateMaintenanceReport = async () => {
  if (!selectedMaintenanceReport) return;

  setMaintenanceUpdateMessage('');
  setMaintenanceUpdateError('');
  setMaintenanceUpdateLoading(true);

  try {
    const response = await fetch(
      `http://localhost:3000/api/admin-dashboard/maintenance-reports/${selectedMaintenanceReport.maintenance_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: maintenanceStatus,
          adminNotes: maintenanceNotes
        })
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || 'Failed to update maintenance report.'
      );
    }

    setMaintenanceUpdateMessage('Maintenance report updated successfully!');

    // Refresh maintenance reports after updating
    await fetchMaintenanceReports();

    // Update the selected report details
    setSelectedMaintenanceReport((previousReport) => ({
      ...previousReport,
      status: maintenanceStatus,
      admin_notes: maintenanceNotes,
      resolved_at:
        maintenanceStatus === 'resolved'
          ? new Date().toISOString()
          : null
    }));

  } catch (error) {
    console.error('Update Maintenance Report Error:', error);
    setMaintenanceUpdateError(error.message);
  } finally {
    setMaintenanceUpdateLoading(false);
  }
};

  // Fetch records when an admin page is opened
  useEffect(() => {
    if (activePage === 'Staff Accounts') {
      fetchStaffAccounts();
    }

    if (activePage === 'Maintenance Reports') {
      fetchMaintenanceReports();
      setSelectedMaintenanceReport(null);
    }

    if (activePage === 'Cleaning Requests') {
      fetchCleaningRequests();
      fetchStaffAccounts();

      setAssignMessage('');
      setAssignError('');
    }

    if (activePage === 'Reservations') {
      fetchReservations();
      setStatusMessage('');
      setStatusError('');
    }
  }, [activePage]);

  // Open delete confirmation modal
  const handleDeleteStaff = (staffId) => {
    setSelectedStaffId(staffId);
    setShowDeleteModal(true);
  };

  // Confirm and delete staff account
  const confirmDeleteStaff = async () => {
    if (!selectedStaffId) return;

    setDeleteLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/accounts/staff/${selectedStaffId}`,
        {
          method: 'DELETE'
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete staff account.');
      }

      setShowDeleteModal(false);
      setSelectedStaffId(null);

      await fetchStaffAccounts();
    } catch (error) {
      console.error('Delete Staff Error:', error);
      alert(error.message);
    } finally {
      setDeleteLoading(false);
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
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: staffName,
            email: staffEmail,
            password: staffPassword
          })
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
  onLogout={onLogout}
/>

      <main
        className="admin-content"
        style={
          activePage === 'Staff Accounts' ||
activePage === 'Reservations' ||
activePage === 'Cleaning Requests' ||
activePage === 'Maintenance Reports'
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
          </>
        )}

        {/* Display Staff Accounts Page */}
        {activePage === 'Staff Accounts' && (
          <div className="staff-management-page">
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

            {/* Create Staff Account */}
            <div className="staff-account-section">
              <h2>Create Staff Account</h2>
              <p>Enter the staff information to create a new account.</p>

              <form onSubmit={handleCreateStaff}>
                <label>Staff Name</label>
                <input
                  type="text"
                  placeholder="Enter staff name"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  required
                />

                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter staff email"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter staff password"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  required
                />

                {staffMessage && (
                  <p className="staff-success">{staffMessage}</p>
                )}

                {staffError && (
                  <p className="staff-error">{staffError}</p>
                )}

                <button type="submit" disabled={staffLoading}>
                  {staffLoading
                    ? 'Creating Account...'
                    : 'Create Staff Account'}
                </button>
              </form>
            </div>

            {/* Staff Directory */}
            <div className="staff-list-section">
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
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Staff ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Date Created</th>
                      <th>Action</th>
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
                        <td>
                          <button
                            type="button"
                            className="delete-staff-btn"
                            onClick={() => handleDeleteStaff(staff.staff_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Display Reservations Page */}
        {activePage === 'Reservations' && (
          <div className="reservation-management-page">
            <div className="reservation-page-header">
              <h1>Reservation Management</h1>
              <p>View and review all customer reservations.</p>
            </div>

            {/* Reservation Status Messages */}
            {statusMessage && (
              <p className="staff-success">{statusMessage}</p>
            )}

            {statusError && (
              <p className="staff-error">{statusError}</p>
            )}

            {reservationLoading ? (
              <p>Loading reservation records...</p>
            ) : reservationError ? (
              <p>{reservationError}</p>
            ) : (
              <div className="reservation-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Reservation ID</th>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Contact Number</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Guests</th>
                      <th>Special Requests</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reservationList.length === 0 ? (
                      <tr>
                        <td colSpan="9" style={{ textAlign: 'center' }}>
                          No reservation records found.
                        </td>
                      </tr>
                    ) : (
                      reservationList.map((reservation) => (
                        <tr key={reservation.reservation_id}>
                          <td>{reservation.reservation_id}</td>
                          <td>{reservation.customer_name}</td>
                          <td>{reservation.customer_email}</td>
                          <td>{reservation.contact_number}</td>
                          <td>
                            {new Date(
                              reservation.check_in
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(
                              reservation.check_out
                            ).toLocaleDateString()}
                          </td>
                          <td>{reservation.guests}</td>
                          <td>{reservation.special_requests || 'None'}</td>
                          <td>
                            <select
                              value={reservation.status}
                              onChange={(e) =>
                                handleUpdateReservationStatus(
                                  reservation.reservation_id,
                                  e.target.value
                                )
                              }
                              disabled={
                                statusLoading === reservation.reservation_id
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="completed">Completed</option>
                            </select>

                            {statusLoading === reservation.reservation_id && (
                              <p>Updating...</p>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Display Cleaning Requests Page */}
        {activePage === 'Cleaning Requests' && (
          <div
  className="cleaning-management-page beach-background-page"
  style={{ '--beach-background': `url(${backgroundImage})` }}
>
            <div className="cleaning-page-header">
              <h1>Cleaning Requests</h1>
              <p>Monitor cleaning requests for completed reservations.</p>
            </div>

            {/* Cleaning Request Summary Cards */}
            <div className="cleaning-summary-cards">
              <div className="cleaning-summary-card pending-card">
                <div className="cleaning-card-icon">
                  <span>◷</span>
                </div>

                <div>
                  <h3>Pending</h3>
                  <h2>{pendingCleaningCount}</h2>
                  <p>Waiting for cleaning</p>
                </div>
              </div>

              <div className="cleaning-summary-card progress-card">
                <div className="cleaning-card-icon">
                  <span>↻</span>
                </div>

                <div>
                  <h3>In Progress</h3>
                  <h2>{inProgressCleaningCount}</h2>
                  <p>Currently being cleaned</p>
                </div>
              </div>

              <div className="cleaning-summary-card completed-card">
                <div className="cleaning-card-icon">
                  <span>✓</span>
                </div>

                <div>
                  <h3>Completed</h3>
                  <h2>{completedCleaningCount}</h2>
                  <p>Cleaning finished</p>
                </div>
              </div>
            </div>

            {/* Staff Assignment Messages */}
            {assignMessage && (
              <p className="staff-success">{assignMessage}</p>
            )}

            {assignError && (
              <p className="staff-error">{assignError}</p>
            )}

            {cleaningRequestLoading ? (
              <p>Loading cleaning requests...</p>
            ) : cleaningRequestError ? (
              <p className="staff-error">{cleaningRequestError}</p>
            ) : (
              <div className="cleaning-request-list">
                {cleaningRequestList.length === 0 ? (
                  <p className="no-cleaning-requests">
                    No cleaning requests found.
                  </p>
                ) : (
                  cleaningRequestList.map((request) => (
                    <div
                      className="cleaning-request-card"
                      key={request.cleaning_id}
                    >
                      <h2>Cleaning Request #{request.cleaning_id}</h2>

                      <div className="cleaning-request-details">
                        <p>
                          <strong>Reservation ID:</strong>{' '}
                          {request.reservation_id}
                        </p>
                        <p>
                          <strong>Customer:</strong> {request.customer_name}
                        </p>
                        <p>
                          <strong>Check-in:</strong>{' '}
                          {request.check_in
                            ? new Date(request.check_in).toLocaleDateString()
                            : '—'}
                        </p>
                        <p>
                          <strong>Check-out:</strong>{' '}
                          {request.check_out
                            ? new Date(request.check_out).toLocaleDateString()
                            : '—'}
                        </p>
                        <p>
                          <strong>Guests:</strong> {request.guests}
                        </p>
                        <p>
                          <strong>Assigned Staff:</strong>{' '}
                          {request.staff_name || 'Not yet assigned'}
                        </p>

                        {/* Select a staff member */}
                        <div className="assign-staff-section">
                          <label>Assign Staff Member:</label>

                          <select
                            value={
                              selectedCleaningStaff[request.cleaning_id] || ''
                            }
                            onChange={(e) =>
                              setSelectedCleaningStaff({
                                ...selectedCleaningStaff,
                                [request.cleaning_id]: e.target.value
                              })
                            }
                          >
                            <option value="">Select staff member</option>

                            {staffList.map((staff) => (
                              <option
                                key={staff.staff_id}
                                value={staff.staff_id}
                              >
                                {staff.name}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() =>
                              handleAssignStaff(request.cleaning_id)
                            }
                            disabled={assignLoading === request.cleaning_id}
                          >
                            {assignLoading === request.cleaning_id
                              ? 'Assigning...'
                              : 'Assign Staff'}
                          </button>
                        </div>

                        <p>
                          <strong>Description:</strong>{' '}
                          {request.description || 'None'}
                        </p>
                        <p>
                          <strong>Status:</strong>{' '}
                          {request.status.replace('_', ' ')}
                        </p>
                        <p>
                          <strong>Date Created:</strong>{' '}
                          {request.created_at
                            ? new Date(
                                request.created_at
                              ).toLocaleDateString()
                            : '—'}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}


{/* Display Maintenance Reports Page */}
{activePage === 'Maintenance Reports' && (
  <div
    className="maintenance-management-page beach-background-page"
    style={{ '--beach-background': `url(${backgroundImage})` }}
  >
    <div className="maintenance-page-header">
      <h1>Maintenance Reports</h1>
      <p>Monitor maintenance issues reported by resort staff.</p>
    </div>

    {/* Maintenance Summary Cards */}
    <div className="cleaning-summary-cards">
      <div className="cleaning-summary-card pending-card">
        <div className="cleaning-card-icon">
          <span>◷</span>
        </div>

        <div>
          <h3>Pending</h3>
          <h2>{pendingMaintenanceCount}</h2>
          <p>Waiting for review</p>
        </div>
      </div>

      <div className="cleaning-summary-card progress-card">
        <div className="cleaning-card-icon">
          <span>↻</span>
        </div>

        <div>
          <h3>In Progress</h3>
          <h2>{inProgressMaintenanceCount}</h2>
          <p>Currently being handled</p>
        </div>
      </div>

      <div className="cleaning-summary-card completed-card">
        <div className="cleaning-card-icon">
          <span>✓</span>
        </div>

        <div>
          <h3>Resolved</h3>
          <h2>{resolvedMaintenanceCount}</h2>
          <p>Issues resolved</p>
        </div>
      </div>
    </div>

    {/* Maintenance Report List */}
    {maintenanceReportLoading ? (
      <p>Loading maintenance reports...</p>
    ) : maintenanceReportError ? (
      <p className="staff-error">{maintenanceReportError}</p>
    ) : (
      <div className="cleaning-request-list">
        {maintenanceReportList.length === 0 ? (
          <p className="no-cleaning-requests">
            No maintenance reports found.
          </p>
        ) : (
          maintenanceReportList.map((report) => (
            <div
              className="cleaning-request-card"
              key={report.maintenance_id}
            >
              <h2>Maintenance Report #{report.maintenance_id}</h2>

              <div className="cleaning-request-details">
                <p>
                  <strong>Issue Title:</strong>{' '}
                  {report.issue_title}
                </p>

                <p>
                  <strong>Submitted By:</strong>{' '}
                  {report.staff_name}
                </p>

                <p>
                  <strong>Priority:</strong>{' '}
                  {report.priority}
                </p>

                <p>
                  <strong>Description:</strong>{' '}
                  {report.description}
                </p>

                <p>
                  <strong>Date Submitted:</strong>{' '}
                  {report.created_at
                    ? new Date(report.created_at).toLocaleString()
                    : '—'}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {report.status.replace('_', ' ')}
                </p>

                <p>
                  <strong>Admin Notes:</strong>{' '}
                  {report.admin_notes || 'None'}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedMaintenanceReport(report);
                    setMaintenanceStatus(report.status || 'pending');
                    setMaintenanceNotes(report.admin_notes || '');
                    setMaintenanceUpdateMessage('');
                    setMaintenanceUpdateError('');
                  }}
                >
                  Review Report
                </button>
              </div>

              {/* Maintenance Report Update Form */}
              {selectedMaintenanceReport &&
                selectedMaintenanceReport.maintenance_id === report.maintenance_id && (
                  
<div className="maintenance-report-details">
  <h3>Review Maintenance Report</h3>

  {/* Update Maintenance Status */}
  <div className="maintenance-form-group">
    <label>Update Status</label>

    <select
      value={maintenanceStatus}
      onChange={(e) => setMaintenanceStatus(e.target.value)}
    >
      <option value="pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="resolved">Resolved</option>
    </select>
  </div>

  {/* Administrator Notes */}
  <div className="maintenance-form-group">
    <label>Administrator Notes</label>

    <textarea
      rows="4"
      placeholder="Enter notes or actions taken..."
      value={maintenanceNotes}
      onChange={(e) => setMaintenanceNotes(e.target.value)}
    />
  </div>

  {/* Update Messages */}
  {maintenanceUpdateMessage && (
    <p className="staff-success">
      {maintenanceUpdateMessage}
    </p>
  )}

  {maintenanceUpdateError && (
    <p className="staff-error">
      {maintenanceUpdateError}
    </p>
  )}

  {/* Form Buttons */}
  <div className="maintenance-form-buttons">
    <button
      type="button"
      onClick={handleUpdateMaintenanceReport}
      disabled={maintenanceUpdateLoading}
    >
      {maintenanceUpdateLoading ? 'Saving...' : 'Save Changes'}
    </button>

    <button
      type="button"
      onClick={() => {
        setSelectedMaintenanceReport(null);
        setMaintenanceUpdateMessage('');
        setMaintenanceUpdateError('');
      }}
    >
      Close
    </button>
  </div>
</div>

                )}
            </div>
          ))
        )}
      </div>
    )}
  </div>
)}

        {/* Display Other Admin Pages */}
        {activePage !== 'Dashboard' &&
          activePage !== 'Staff Accounts' &&
          activePage !== 'Reservations' &&
          activePage !== 'Cleaning Requests' &&
          activePage !== 'Maintenance Reports' && (
            <h2>{activePage}</h2>
          )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <div className="delete-modal-icon">
                <span>!</span>
              </div>

              <h2>Delete Staff Account</h2>

              <p>
                Are you sure you want to delete this staff account?
                This action cannot be undone.
              </p>

              <div className="delete-modal-actions">
                <button
                  type="button"
                  className="cancel-delete-btn"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedStaffId(null);
                  }}
                  disabled={deleteLoading}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="confirm-delete-btn"
                  onClick={confirmDeleteStaff}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;