import React, { useState } from 'react';
import MainLogin from './components/admin/MainLogin.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CustomerRegistration from './components/customer/CustomerRegistration.jsx';
import CustomerLogin from './components/customer/CustomerLogin.jsx';
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

// Display administrator dashboard after successful login
if (admin) {
  return <AdminDashboard />;
}

// Display customer registration page
if (currentPage === '/register') {
  return (
    <CustomerRegistration
      onBackToLogin={() => {
  window.history.pushState({}, '', '/customer-login');
  setCurrentPage('/customer-login');
}}
onRegisterSuccess={() => {
  window.history.pushState({}, '', '/customer-login');
  setCurrentPage('/customer-login');
}}
    />
  );
}

// Display customer login page
if (currentPage === '/customer-login') {
  return (
    <CustomerLogin
      onLoginSuccess={(customerData) => {
        setCustomer(customerData);
        window.history.pushState({}, '', '/customer-dashboard');
        setCurrentPage('/customer-dashboard');
      }}
      onCreateAccount={() => {
        window.history.pushState({}, '', '/register');
        setCurrentPage('/register');
      }}
    />
  );
}

// Display customer dashboard after successful login
if (currentPage === '/customer-dashboard' && customer) {
  return <CustomerDashboard customer={customer} />;
}


  return (
   <MainLogin onLoginSuccess={setAdmin} />
  );
}

export default App;