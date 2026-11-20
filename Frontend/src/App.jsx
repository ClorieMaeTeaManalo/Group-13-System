import React, { useState } from 'react';
import MainLogin from './components/admin/MainLogin.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CustomerRegistration from './components/customer/CustomerRegistration.jsx';
import CustomerDashboard from './components/customer/CustomerDashboard.jsx';

function App() {
  // Store logged-in administrator
  const [admin, setAdmin] = useState(null);

  // Store current page
const [currentPage, setCurrentPage] = useState(
  window.location.pathname
);

// Display administrator dashboard after successful login
if (admin) {
  return <AdminDashboard />;
}

// Display customer registration page
if (currentPage === '/register') {
  return (
    <CustomerRegistration
      onBackToLogin={() => {
        window.history.pushState({}, '', '/');
        setCurrentPage('/');
      }}
      onRegisterSuccess={() => {
        window.history.pushState({}, '', '/customer-dashboard');
        setCurrentPage('/customer-dashboard');
      }}
    />
  );
}
// Display customer dashboard
if (currentPage === '/customer-dashboard') {
  return <CustomerDashboard />;
}


  return (
   <MainLogin onLoginSuccess={setAdmin} />
  );
}

export default App;