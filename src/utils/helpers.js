// // // // src/utils/helpers.js
// // // import { API_BASE_URL } from './constants';

// // // export const setAuthToken = (token) => {
// // //   localStorage.setItem('authToken', token);
// // // };

// // // export const getAuthToken = () => {
// // //   return localStorage.getItem('authToken');
// // // };

// // // export const removeAuthToken = () => {
// // //   localStorage.removeItem('authToken');
// // // };

// // // export const setUserData = (user) => {
// // //   localStorage.setItem('userData', JSON.stringify(user));
// // // };

// // // export const getUserData = () => {
// // //   const userData = localStorage.getItem('userData');
// // //   return userData ? JSON.parse(userData) : null;
// // // };

// // // export const removeUserData = () => {
// // //   localStorage.removeItem('userData');
// // // };

// // // // Helper for constructing image URLs from backend paths
// // // export const getImageUrl = (relativePath) => {
// // //   if (!relativePath) {
// // //     // Provide a reasonable fallback if no image path is given
// // //     return 'https://placehold.co/120x120/FFACD8/FF0099?text=No+Image'; // Or your local placeholder e.g., '/images/placeholder.png'
// // //   }

// // //   // If the relativePath is already a full URL (e.g., from an external CDN), return it as is.
// // //   if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
// // //     return relativePath;
// // //   }

// // //   // If API_BASE_URL is 'http://localhost:8000/api', we want 'http://localhost:8000'
// // //   const baseUrl = API_BASE_URL.replace('/api', '');

// // //   // Ensure relativePath starts with a '/' if it doesn't already, to form a correct URL path
// // //   const normalizedRelativePath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

// // //   return `${baseUrl}${normalizedRelativePath}`;
// // // };

// // // src/utils/helpers.js
// // import { API_BASE_URL } from './constants';

// // export const setAuthToken = (token) => {
// //   localStorage.setItem('authToken', token);
// // };

// // export const getAuthToken = () => {
// //   return localStorage.getItem('authToken');
// // };

// // export const removeAuthToken = () => {
// //   localStorage.removeItem('authToken');
// // };

// // export const setUserData = (user) => {
// //   localStorage.setItem('userData', JSON.stringify(user));
// // };

// // export const getUserData = () => {
// //   const userData = localStorage.getItem('userData');
// //   return userData ? JSON.parse(userData) : null;
// // };

// // export const removeUserData = () => {
// //   localStorage.removeItem('userData');
// // };

// // // Helper for constructing image URLs from backend paths
// // export const getImageUrl = (relativePath) => {
// //     // If API_BASE_URL is 'http://localhost:8000/api', we want 'http://localhost:8000'
// //     const baseUrl = API_BASE_URL.replace('/api', '');
// //     return `<span class="math-inline">\{baseUrl\}</span>{relativePath}`;
// // };


// // src/utils/helpers.js
// import { API_BASE_URL } from './constants';

// // For storing/retrieving auth token from localStorage
// export const setAuthToken = (token) => localStorage.setItem('authToken', token);
// export const getAuthToken = () => localStorage.getItem('authToken');
// export const removeAuthToken = () => localStorage.removeItem('authToken');

// // For storing/retrieving user data from localStorage
// export const setUserData = (user) => localStorage.setItem('userData', JSON.stringify(user));
// export const getUserData = () => {
//   const userData = localStorage.getItem('userData');
//   return userData ? JSON.parse(userData) : null;
// };
// export const removeUserData = () => localStorage.removeItem('userData');

// // **Crucial for image fetching**
// export const getImageUrl = (imagePath) => {
//   if (!imagePath) {
//     // Fallback image if no image path is provided
//     return "https://placehold.co/120x120/FFACD8/FF0099?text=No+Image";
//   }

//   // If your backend directly returns a full URL (e.g., from an S3 bucket)
//   if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//     return imagePath;
//   }

//   // Handle cases where the backend returns:
//   // 1. Just the filename (e.g., "my_category.jpg")
//   // 2. A path like "uploads/my_category.jpg"
//   // 3. A path like "/uploads/my_category.jpg"

//   // Ensure the base URL doesn't have a trailing slash
//   const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

//   // Ensure imagePath doesn't have a leading slash if baseUrl already handles it,
//   // or add 'uploads/' if your backend serves from a subfolder.
//   // This is the most common setup for a simple static file server:
//   // e.g., `${baseUrl}/uploads/${imagePath}`
  
//   // Example if backend serves from `http://localhost:8000/uploads/`
//   // and imagePath is just the filename or starts with 'uploads/'
//   if (imagePath.startsWith('uploads/')) {
//     return `${baseUrl}/${imagePath}`;
//   } else if (imagePath.startsWith('/uploads/')) {
//       // If path is already absolute, remove leading slash to avoid double slash
//       return `${baseUrl}${imagePath}`;
//   } else {
//     // If it's just the filename, assume it's in the 'uploads' folder
//     return `${baseUrl}/uploads/${imagePath}`;
//   }
// };

// src/utils/helpers.js
import { API_BASE_URL } from './constants';

// For storing/retrieving auth token from localStorage
export const setAuthToken = (token) => localStorage.setItem('authToken', token);
export const getAuthToken = () => localStorage.getItem('authToken');
export const removeAuthToken = () => localStorage.removeItem('authToken');

// For storing/retrieving user data from localStorage
export const setUserData = (user) => localStorage.setItem('userData', JSON.stringify(user));
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};
export const removeUserData = () => localStorage.removeItem('userData');

// **CRUCIAL: Corrected getImageUrl function**
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    // Fallback image if no image path is provided or if it's null/undefined
    return "https://placehold.co/120x120/FFACD8/FF0099?text=No+Image";
  }

  // If your backend directly returns a full URL (e.g., from an S3 bucket or external CDN)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Ensure API_BASE_URL does not have a trailing slash, and imagePath does not have a leading slash
  // unless it's intended as a root path.
  // Your backend stores `/uploads/filename.jpg`.
  // Your API_BASE_URL should be 'http://localhost:8000'.
  // We want to construct 'http://localhost:8000/uploads/filename.jpg'.

  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

  // The imagePath from your backend starts with '/uploads/'.
  // If we just append it, it will be `http://localhost:8000/uploads/filename.jpg`.
  // This is correct.
  return `${baseUrl}${imagePath}`;
};