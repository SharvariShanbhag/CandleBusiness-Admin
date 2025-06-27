// // src/components/Sidebar.jsx
// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { User, Package, Box, LogOut } from 'lucide-react'; // Icons
// import { COLORS } from '../utils/constants';

// const Sidebar = ({ setCurrentPage }) => {
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     setCurrentPage('login'); // Redirect to login page
//   };

//   const menuItems = [
//     { name: 'Profile', icon: <User size={20} color={COLORS.pinkDark} />, page: 'profile' },
//     { name: 'Categories', icon: <Box size={20} color={COLORS.pinkDark} />, page: 'categories' },
//     { name: 'Products', icon: <Package size={20} color={COLORS.pinkDark} />, page: 'products' },
//     { name: 'Logout', icon: <LogOut size={20} color={COLORS.pinkDark} />, action: handleLogout },
//   ];

//   return (
//     <aside style={sidebarStyle}>
//       <ul style={menuListStyle}>
//         {menuItems.map((item) => (
//           <li key={item.name} style={menuItemStyle}>
//             <button
//               onClick={() => (item.action ? item.action() : setCurrentPage(item.page))}
//               style={menuButtonStyle}
//             >
//               {item.icon}
//               <span style={menuButtonTextStyle}>{item.name}</span>
//             </button>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// const sidebarStyle = {
//   width: '220px',
//   backgroundColor: COLORS.pinkLight, /* Light pink background for sidebar */
//   padding: '20px 15px',
//   boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   minHeight: 'calc(100vh - 70px)', /* Adjust based on Navbar height */
//   position: 'sticky',
//   top: '70px', /* Align below Navbar */
//   overflowY: 'auto',
//   borderRadius: '0 15px 15px 0', /* Rounded right corners */
//   borderRight: `1px solid ${COLORS.pinkMediumLight}`,
// };

// const menuListStyle = {
//   listStyle: 'none',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '10px',
// };

// const menuItemStyle = {
//   width: '100%',
// };

// const menuButtonStyle = {
//   background: 'none',
//   border: 'none',
//   color: COLORS.textDark,
//   display: 'flex',
//   alignItems: 'center',
//   gap: '12px',
//   padding: '12px 15px',
//   width: '100%',
//   textAlign: 'left',
//   borderRadius: '10px',
//   transition: 'background-color 0.3s ease, transform 0.2s ease',
//   fontSize: '1.1rem',
//   fontWeight: '500',
//   boxShadow: 'none', /* Override global button shadow for clean sidebar buttons */
// };

// const menuButtonStyleHover = {
//   backgroundColor: COLORS.pinkMediumLight, /* Slightly darker pink on hover */
//   transform: 'translateX(5px)',
// };

// // Adding hover effects directly via JS for plain CSS
// menuButtonStyle.onmouseover = (e) => Object.assign(e.currentTarget.style, menuButtonStyleHover);
// menuButtonStyle.onmouseout = (e) => Object.assign(e.currentTarget.style, menuButtonStyle);


// const menuButtonTextStyle = {
//   flexGrow: 1,
// };

// export default Sidebar;



// src/components/Sidebar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Package, Box, LogOut } from 'lucide-react'; // Icons
import { COLORS } from '../utils/constants';

const Sidebar = ({ setCurrentPage }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setCurrentPage('login'); // Redirect to login page
  };

  const menuItems = [
    { name: 'Profile', icon: <User size={20} color={COLORS.pinkDark} />, page: 'profile' },
    { name: 'Categories', icon: <Box size={20} color={COLORS.pinkDark} />, page: 'categories' },
    { name: 'Products', icon: <Package size={20} color={COLORS.pinkDark} />, page: 'products' },
    { name: 'Logout', icon: <LogOut size={20} color={COLORS.pinkDark} />, action: handleLogout },
  ];

  return (
    <aside style={sidebarStyle}>
      <ul style={menuListStyle}>
        {menuItems.map((item) => (
          <li key={item.name} style={menuItemStyle}>
            <button
              onClick={() => (item.action ? item.action() : setCurrentPage(item.page))}
              style={menuButtonStyle}
            >
              {item.icon}
              <span style={menuButtonTextStyle}>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const sidebarStyle = {
  width: '220px',
  backgroundColor: COLORS.pinkLight, /* Light pink background for sidebar */
  padding: '20px 15px',
  boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 'calc(100vh - 70px)', /* Adjust based on Navbar height */
  position: 'sticky',
  top: '70px', /* Align below Navbar */
  overflowY: 'auto',
  borderRadius: '0 15px 15px 0', /* Rounded right corners */
  borderRight: `1px solid ${COLORS.pinkMediumLight}`,
};

const menuListStyle = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const menuItemStyle = {
  width: '100%',
};

const menuButtonStyle = {
  background: 'none',
  border: 'none',
  color: COLORS.textDark,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 15px',
  width: '100%',
  textAlign: 'left',
  borderRadius: '10px',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  fontSize: '1.1rem',
  fontWeight: '500',
  boxShadow: 'none', /* Override global button shadow for clean sidebar buttons */
};

const menuButtonStyleHover = {
  backgroundColor: COLORS.pinkMediumLight, /* Slightly darker pink on hover */
  transform: 'translateX(5px)',
};

// Adding hover effects directly via JS for plain CSS
menuButtonStyle.onmouseover = (e) => Object.assign(e.currentTarget.style, menuButtonStyleHover);
menuButtonStyle.onmouseout = (e) => Object.assign(e.currentTarget.style, menuButtonStyle);


const menuButtonTextStyle = {
  flexGrow: 1,
};

export default Sidebar;
