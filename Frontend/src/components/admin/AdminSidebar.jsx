
import React from 'react';

function AdminSidebar({ activePage, onPageChange }) {
  return (
    <div className="admin-sidebar">
      <h2>Bella Beach</h2>
      <p>Administrator</p>

      <nav>
        <ul>
          <li
            className={activePage === 'Dashboard' ? 'active' : ''}
            onClick={() => onPageChange('Dashboard')}
          >
            Dashboard
          </li>

          <li
            className={activePage === 'Staff Accounts' ? 'active' : ''}
            onClick={() => onPageChange('Staff Accounts')}
          >
            Staff Accounts
          </li>

          <li onClick={() => onPageChange('Reservations')}>
            Reservations
          </li>

          <li onClick={() => onPageChange('Cleaning Requests')}>
            Cleaning Requests
          </li>

          <li onClick={() => onPageChange('Maintenance Reports')}>
            Maintenance Reports
          </li>

          <li onClick={() => onPageChange('Payment Information')}>
            Payment Information
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSidebar;