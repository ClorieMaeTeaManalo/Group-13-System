import React from 'react';

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>Bella Beach</h2>
      <p>Administrator</p>

      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Staff Accounts</li>
          <li>Reservations</li>
          <li>Cleaning Requests</li>
          <li>Maintenance Reports</li>
          <li>Payment Information</li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSidebar;