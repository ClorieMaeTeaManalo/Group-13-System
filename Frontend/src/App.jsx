import React, { useState } from 'react';

import MainLogin from './components/admin/MainLogin.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CustomerRegistration from './components/customer/CustomerRegistration.jsx';
import CustomerDashboard from './components/customer/CustomerDashboard.jsx';

function App() {
  // Store logged-in administrator
  const [admin, setAdmin] = useState(null);

  // Store logged-in customer
  const [customer, setCustomer] = useState(null);

  // Store current page
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname
  );

  // Display administrator dashboard
  if (admin) {
    return <AdminDashboard />;
  }

  // Display customer dashboard
  if (customer) {
    return <CustomerDashboard customer={customer} />;
  }

  // Display customer registration page
  if (currentPage === '/register') {
    return (
      <CustomerRegistration
        onBackToLogin={() => {
          window.history.pushState({}, '', '/');
          setCurrentPage('/');
        }}
        onRegisterSuccess={(customerData) => {
          setCustomer({
            ...customerData,
            role: 'customer'
          });

          window.history.pushState(
            {},
            '',
            '/customer-dashboard'
          );

          setCurrentPage('/customer-dashboard');
        }}
      />
    );
  }

  // Display shared login page for Admin and Customer
  return (
    <MainLogin
      onLoginSuccess={(userData) => {
        if (userData.role === 'admin') {
          setAdmin(userData);
        } else if (userData.role === 'customer') {
          setCustomer(userData);
        }
      }}
    />
  );
}

export default App;