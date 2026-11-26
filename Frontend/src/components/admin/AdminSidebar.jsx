function AdminSidebar({ activePage, onPageChange, onLogout }) {
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

          <li
            className={activePage === 'Reservations' ? 'active' : ''}
            onClick={() => onPageChange('Reservations')}
          >
            Reservations
          </li>

          <li
            className={activePage === 'Cleaning Requests' ? 'active' : ''}
            onClick={() => onPageChange('Cleaning Requests')}
          >
            Cleaning Requests
          </li>

          <li
            className={activePage === 'Maintenance Reports' ? 'active' : ''}
            onClick={() => onPageChange('Maintenance Reports')}
          >
            Maintenance Reports
          </li>

          <li
            className={activePage === 'Payment Information' ? 'active' : ''}
            onClick={() => onPageChange('Payment Information')}
          >
            Payment Information
          </li>
        </ul>
      </nav>

      {/* Sign Out Button */}
<div className="sidebar-logout">
  <button onClick={onLogout}>
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvZy1vdXQgcHJldmlldy1pY29uIj48cGF0aCBkPSJtMTYgMTcgNS01LTUtNSIvPjxwYXRoIGQ9Ik0yMSAxMkg5Ii8+PHBhdGggZD0iTTkgMjFINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg0Ii8+PC9zdmc+"
      alt="Sign Out"
      className="logout-icon"
    />
    <span>Sign Out</span>
  </button>
</div>
    </div>
  );
}

export default AdminSidebar;