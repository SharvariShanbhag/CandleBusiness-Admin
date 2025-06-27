// // src/components/Navbar.jsx
// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { User } from 'lucide-react'; // Import user icon
// import { COLORS } from '../utils/constants';

// const Navbar = () => {
//   const { user } = useAuth();

//   return (
//     <nav style={navbarStyle}>
//       <div style={brandContainerStyle}>
//         <span className="brand-name-font" style={brandTextStyle}>Candle Business</span>
//       </div>
//       <div style={userInfoStyle}>
//         {user && (
//           <>
//             <User size={20} color={COLORS.pinkDark} />
//             <span style={userNameStyle}>{user.name}</span>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// const navbarStyle = {
//   backgroundColor: COLORS.pinkVeryLight,
//   padding: '15px 30px',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//   zIndex: 100,
//   position: 'sticky',
//   top: 0,
//   width: '100%',
// };

// const brandContainerStyle = {
//   flexGrow: 1,
//   textAlign: 'center',
// };

// const brandTextStyle = {
//   // Styles applied via .brand-name-font in index.css
// };

// const userInfoStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '8px',
//   color: COLORS.textDark,
//   fontWeight: '600',
//   fontSize: '0.95rem',
// };

// const userNameStyle = {
//   // Minimal font style applied by default from body font
// };

// export default Navbar;

// src/components/Navbar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react'; // Import user icon
import { COLORS } from '../utils/constants';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav style={navbarStyle}>
      <div style={brandContainerStyle}>
        <span className="brand-name-font" style={brandTextStyle}>Candle Business</span>
      </div>
      <div style={userInfoStyle}>
        {user && (
          <>
            <User size={20} color={COLORS.pinkDark} />
            <span style={userNameStyle}>{user.name}</span>
          </>
        )}
      </div>
    </nav>
  );
};

const navbarStyle = {
  backgroundColor: COLORS.pinkVeryLight,
  padding: '15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 100,
  position: 'sticky',
  top: 0,
  width: '100%',
};

const brandContainerStyle = {
  flexGrow: 1,
  textAlign: 'center',
};

const brandTextStyle = {
  // Styles applied via .brand-name-font in index.css
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: COLORS.textDark,
  fontWeight: '600',
  fontSize: '0.95rem',
};

const userNameStyle = {
  // Minimal font style applied by default from body font
};

export default Navbar;