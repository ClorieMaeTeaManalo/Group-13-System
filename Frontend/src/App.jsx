import React, { useState } from 'react';

import MainLogin from './components/admin/MainLogin.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CustomerRegistration from './components/customer/CustomerRegistration.jsx';
import CustomerDashboard from './components/customer/CustomerDashboard.jsx';
import CustomerProfile from './components/customer/CustomerProfile.jsx';
import StaffDashboard from './components/staff/StaffDashboard.jsx';

function App() {
  // Store logged-in administrator
  const [admin, setAdmin] = useState(null);

  // Store logged-in customer
  const [customer, setCustomer] = useState(null);

  // Store logged-in staff
  const [staff, setStaff] = useState(null);

  // Store current page
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname
  );

  // Display administrator dashboard
if (admin) {
  return (
    <AdminDashboard
      onLogout={() => {
        setAdmin(null);

        window.history.pushState({}, '', '/');
        setCurrentPage('/');
      }}
    />
  );
}

  // Display customer dashboard
  if (customer) {
  if (currentPage === '/customer-profile') {
    return (
      <CustomerProfile
        customer={customer}
        onBack={() => {
          window.history.pushState({}, '', '/customer-dashboard');
          setCurrentPage('/customer-dashboard');
        }}
      />
    );
  }

  return (
    <CustomerDashboard
      customer={customer}
      onOpenProfile={() => {
        window.history.pushState({}, '', '/customer-profile');
        setCurrentPage('/customer-profile');
      }}
    />
  );
}
  
  // Display staff dashboard
  if (staff) {
  return <StaffDashboard staff={staff} />;
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
        }else if (userData.role === 'staff') {
          setStaff(userData);
        }
      }}
    />
  );
}

export default App;