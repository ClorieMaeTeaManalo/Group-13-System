import React, { useState } from 'react';
import MainLogin from './components/admin/MainLogin.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';

function App() {
  // Store logged-in administrator
  const [admin, setAdmin] = useState(null);

// Display administrator dashboard after successful login
if (admin) {
  return <AdminDashboard />;
}

  return (
   <MainLogin onLoginSuccess={setAdmin} />
  );
}

export default App;