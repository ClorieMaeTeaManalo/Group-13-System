import React, { useState } from 'react';
import MainLogin from './components/admin/MainLogin.jsx';

function App() {
  // Store logged-in administrator
  const [admin, setAdmin] = useState(null);

  // Display login success
  if (admin) {
    return (
      <div>
        <h1>Login Successful!</h1>
        <p>Welcome, {admin.name}!</p>
        <p>Administrator access granted.</p>
      </div>
    );
  }

  return (
   <MainLogin onLoginSuccess={setAdmin} />
  );
}

export default App;