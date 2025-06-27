// // src/pages/ProfilePage.jsx
// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { User, Mail, Shield } from 'lucide-react'; // Icons
// import { COLORS } from '../utils/constants';

// const ProfilePage = () => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (!user) {
//     return <div style={{padding: '20px', textAlign: 'center', color: COLORS.textDark}}>Please log in to view your profile.</div>;
//   }

//   return (
//     <div style={profilePageStyle}>
//       <div style={profileCardStyle} className="card">
//         <h2 style={profileTitleStyle}>My Profile</h2>
//         <div style={profileInfoContainerStyle}>
//           <div style={infoItemStyle}>
//             <User size={24} color={COLORS.pinkDark} style={iconStyle} />
//             <span style={infoLabelStyle}>Name:</span>
//             <span style={infoValueStyle}>{user.name}</span>
//           </div>
//           <div style={infoItemStyle}>
//             <Mail size={24} color={COLORS.pinkDark} style={iconStyle} />
//             <span style={infoLabelStyle}>Email:</span>
//             <span style={infoValueStyle}>{user.email}</span>
//           </div>
//           <div style={infoItemStyle}>
//             <Shield size={24} color={COLORS.pinkDark} style={iconStyle} />
//             <span style={infoLabelStyle}>Role:</span>
//             <span style={infoValueStyle}>{user.isAdmin ? 'Admin' : 'User'}</span>
//           </div>
//           {/* Add more profile details here if available from your user object */}
//         </div>
//         {/* You could add an "Edit Profile" button here */}
//         {/* <button style={editButtonStyle}>Edit Profile</button> */}
//       </div>
//     </div>
//   );
// };

// const profilePageStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'flex-start', /* Align to top for longer content */
//   padding: '30px',
//   flexGrow: 1,
//   background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
// };

// const profileCardStyle = {
//   backgroundColor: COLORS.pinkVeryLight,
//   padding: '40px',
//   borderRadius: '20px',
//   boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
//   textAlign: 'center',
//   maxWidth: '500px',
//   width: '100%',
//   border: `1px solid ${COLORS.pinkMediumLight}`,
// };

// const profileTitleStyle = {
//   color: COLORS.pinkDark,
//   marginBottom: '30px',
//   fontSize: '2.8rem',
//   fontFamily: 'Dancing Script, cursive',
//   textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
// };

// const profileInfoContainerStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '20px',
//   marginTop: '20px',
// };

// const infoItemStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   padding: '15px',
//   backgroundColor: COLORS.pinkLight,
//   borderRadius: '10px',
//   boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   border: `1px solid ${COLORS.pinkMediumLight}`,
// };

// const iconStyle = {
//   marginRight: '15px',
//   minWidth: '24px',
// };

// const infoLabelStyle = {
//   fontWeight: 'bold',
//   color: COLORS.textDark,
//   marginRight: '10px',
//   fontSize: '1.1rem',
// };

// const infoValueStyle = {
//   color: COLORS.textDark,
//   fontSize: '1.1rem',
//   flexGrow: 1,
//   textAlign: 'left',
//   wordBreak: 'break-word', /* Handle long emails */
// };

// const editButtonStyle = {
//   marginTop: '30px',
//   backgroundColor: COLORS.pinkMediumDark,
//   color: COLORS.textLight,
//   padding: '12px 25px',
//   borderRadius: '8px',
//   fontSize: '1rem',
//   fontWeight: 'bold',
//   boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
//   border: 'none',
//   cursor: 'pointer',
//   transition: 'background-color 0.3s ease, transform 0.2s ease',
// };

// const editButtonStyleHover = {
//   backgroundColor: COLORS.pinkDark,
//   transform: 'translateY(-2px)',
//   boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
// };

// editButtonStyle.onmouseover = (e) => Object.assign(e.currentTarget.style, editButtonStyleHover);
// editButtonStyle.onmouseout = (e) => Object.assign(e.currentTarget.style, editButtonStyle);


// export default ProfilePage;

// src/pages/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { User, Mail, Shield } from 'lucide-react'; // Icons
import { COLORS } from '../utils/constants';

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div style={{padding: '20px', textAlign: 'center', color: COLORS.textDark}}>Please log in to view your profile.</div>;
  }

  return (
    <div style={profilePageStyle}>
      <div style={profileCardStyle} className="card">
        <h2 style={profileTitleStyle}>My Profile</h2>
        <div style={profileInfoContainerStyle}>
          <div style={infoItemStyle}>
            <User size={24} color={COLORS.pinkDark} style={iconStyle} />
            <span style={infoLabelStyle}>Name:</span>
            <span style={infoValueStyle}>{user.name}</span>
          </div>
          <div style={infoItemStyle}>
            <Mail size={24} color={COLORS.pinkDark} style={iconStyle} />
            <span style={infoLabelStyle}>Email:</span>
            <span style={infoValueStyle}>{user.email}</span>
          </div>
          <div style={infoItemStyle}>
            <Shield size={24} color={COLORS.pinkDark} style={iconStyle} />
            <span style={infoLabelStyle}>Role:</span>
            <span style={infoValueStyle}>{user.isAdmin ? 'Admin' : 'User'}</span>
          </div>
          {/* Add more profile details here if available from your user object */}
        </div>
        {/* You could add an "Edit Profile" button here */}
        {/* <button style={editButtonStyle}>Edit Profile</button> */}
      </div>
    </div>
  );
};

const profilePageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start', /* Align to top for longer content */
  padding: '30px',
  flexGrow: 1,
  background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
};

const profileCardStyle = {
  backgroundColor: COLORS.pinkVeryLight,
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  maxWidth: '500px',
  width: '100%',
  border: `1px solid ${COLORS.pinkMediumLight}`,
};

const profileTitleStyle = {
  color: COLORS.pinkDark,
  marginBottom: '30px',
  fontSize: '2.8rem',
  fontFamily: 'Dancing Script, cursive',
  textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
};

const profileInfoContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '20px',
};

const infoItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: COLORS.pinkLight,
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${COLORS.pinkMediumLight}`,
};

const iconStyle = {
  marginRight: '15px',
  minWidth: '24px',
};

const infoLabelStyle = {
  fontWeight: 'bold',
  color: COLORS.textDark,
  marginRight: '10px',
  fontSize: '1.1rem',
};

const infoValueStyle = {
  color: COLORS.textDark,
  fontSize: '1.1rem',
  flexGrow: 1,
  textAlign: 'left',
  wordBreak: 'break-word', /* Handle long emails */
};

const editButtonStyle = {
  marginTop: '30px',
  backgroundColor: COLORS.pinkMediumDark,
  color: COLORS.textLight,
  padding: '12px 25px',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 'bold',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
};

const editButtonStyleHover = {
  backgroundColor: COLORS.pinkDark,
  transform: 'translateY(-2px)',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
};

editButtonStyle.onmouseover = (e) => Object.assign(e.currentTarget.style, editButtonStyleHover);
editButtonStyle.onmouseout = (e) => Object.assign(e.currentTarget.style, editButtonStyle);


export default ProfilePage;