import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Global styles
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider
import { Toaster } from 'react-hot-toast'; // For toast notifications

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} /> {/* Toast notifications */}
    </AuthProvider>
  </React.StrictMode>,
);