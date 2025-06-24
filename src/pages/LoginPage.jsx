// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../utils/constants';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    // AuthContext handles redirection if successful login happens.
  };

  return (
    <div style={loginPageStyle}>
      <div style={loginCardStyle} className="card">
        <h2 style={loginTitleStyle}>Admin Login</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonStyleHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

const loginPageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: COLORS.pinkVeryLight,
};

const loginCardStyle = {
  backgroundColor: COLORS.pinkLight, /* Lighter card background */
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
  textAlign: 'center',
  maxWidth: '450px',
  width: '90%',
};

const loginTitleStyle = {
  color: COLORS.pinkDark,
  marginBottom: '30px',
  fontSize: '2.5rem',
  fontFamily: 'Dancing Script, cursive', /* Aesthetic font for title */
  textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const inputGroupStyle = {
  textAlign: 'left',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: COLORS.textDark,
  fontWeight: '600',
};

const inputStyle = {
  padding: '12px 18px',
  border: '1px solid ' + COLORS.pinkMediumLight,
  borderRadius: '8px',
  fontSize: '1rem',
  width: '100%',
  backgroundColor: COLORS.pinkVeryLight,
  color: COLORS.textDark,
};

const buttonStyle = {
  backgroundColor: COLORS.pinkDark,
  color: COLORS.textLight,
  padding: '14px 25px',
  borderRadius: '10px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
};

const buttonStyleHover = {
  backgroundColor: COLORS.pinkMediumDark,
  transform: 'translateY(-3px)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
};

export default LoginPage;