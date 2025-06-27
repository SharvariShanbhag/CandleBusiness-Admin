// // src/components/LoadingSpinner.jsx
// import React from 'react';
// import { COLORS } from '../utils/constants';

// const LoadingSpinner = () => {
//   return (
//     <div style={spinnerContainerStyle}>
//       <div style={spinnerStyle}></div>
//     </div>
//   );
// };

// const spinnerContainerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '200px', // Or adjust as needed
//   width: '100%',
// };

// const spinnerStyle = {
//   border: `4px solid ${COLORS.pinkLight}`,
//   borderTop: `4px solid ${COLORS.pinkDark}`,
//   borderRadius: '50%',
//   width: '40px',
//   height: '40px',
//   animation: 'spin 1s linear infinite',
// };

// // Add keyframes to your index.css or directly inject if preferred
// // For simplicity, add to index.css if not already present
// /*
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
// */

// export default LoadingSpinner;

// src/components/LoadingSpinner.jsx
import React from 'react';
import { COLORS } from '../utils/constants';

const LoadingSpinner = () => {
  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

const spinnerContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px', // Or adjust as needed
  width: '100%',
};

const spinnerStyle = {
  border: `4px solid ${COLORS.pinkLight}`,
  borderTop: `4px solid ${COLORS.pinkDark}`,
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
};

// Add keyframes to your index.css or directly inject if preferred
// For simplicity, add to index.css if not already present
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

export default LoadingSpinner;