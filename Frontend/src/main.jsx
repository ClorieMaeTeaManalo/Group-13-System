// Import React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import App component and CSS
import App from './App.jsx';
import './style.css';

// Render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);