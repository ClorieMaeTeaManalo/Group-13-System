
import React from "react";
import "./CustomerDashboard.css";

function CustomerDashboard({ customer, onOpenProfile }) {

  return (
    <main className="customer-dashboard">

      {/* Dashboard Header */}
      <header className="customer-dashboard-header">
        <h2>Bella Beach Resort</h2>
        <span>Customer Portal</span>
      </header>

      {/* Welcome Section */}
      <section className="customer-dashboard-content">
        <h1>Welcome to Bella Beach Resort!</h1>

        <p>
          Thank you for creating an account.
          Enjoy your stay with us!
        </p>

        <div className="customer-dashboard-card">
  <h2>Customer Dashboard</h2>

  <p>
    Your account has been successfully created.
  </p>

  <button
  className="customer-profile-button"
  onClick={onOpenProfile}
>
  My Profile
</button>
</div>
      </section>

      {/* Footer */}
      <footer className="customer-dashboard-footer">
        Bella Beach Resort Management System
      </footer>

    </main>
  );
}

export default CustomerDashboard;
