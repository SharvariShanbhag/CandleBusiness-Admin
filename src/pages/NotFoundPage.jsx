// src/pages/NotFoundPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../utils/constants';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={notFoundPageStyle}>
      <h1 style={titleStyle}>404</h1>
      <p style={messageStyle}>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')} style={homeButtonStyle}>
        Go to Homepage
      </button>
    </div>
  );
};

const notFoundPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 70px)', // Adjust based on Navbar height
  background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
  color: COLORS.textDark,
  textAlign: 'center',
  padding: '20px',
};

const titleStyle = {
  fontSize: '6rem',
  color: COLORS.pinkDark,
  marginBottom: '20px',
  textShadow: '2px 2px 5px rgba(0,0,0,0.1)',
};

const messageStyle = {
  fontSize: '1.5rem',
  marginBottom: '30px',
};

const homeButtonStyle = {
  backgroundColor: COLORS.pinkMediumDark,
  color: COLORS.textLight,
  padding: '12px 25px',
  borderRadius: '10px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
};

export default NotFoundPage;