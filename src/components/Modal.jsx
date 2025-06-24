// src/components/Modal.jsx
import React from 'react';
import { X } from 'lucide-react'; // Import close icon
import { COLORS } from '../utils/constants';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>{title}</h2>
          <button onClick={onClose} style={closeButtonStyle}>
            <X size={24} color={COLORS.pinkDark} />
          </button>
        </div>
        <div style={modalBodyStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: COLORS.pinkVeryLight,
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  maxWidth: '600px',
  width: '90%',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  color: COLORS.textDark,
  display: 'flex',
  flexDirection: 'column',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${COLORS.pinkLight}`,
  paddingBottom: '15px',
  marginBottom: '20px',
};

const modalTitleStyle = {
  color: COLORS.pinkDark,
  fontSize: '1.8rem',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '5px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'background-color 0.2s ease',
};

const closeButtonStyleHover = {
  backgroundColor: COLORS.pinkLight,
};

closeButtonStyle.onmouseover = (e) => Object.assign(e.currentTarget.style, closeButtonStyleHover);
closeButtonStyle.onmouseout = (e) => Object.assign(e.currentTarget.style, closeButtonStyle);


const modalBodyStyle = {
  flexGrow: 1,
};

export default Modal;