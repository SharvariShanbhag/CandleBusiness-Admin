// src/utils/constants.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// This is how your COLORS in src/utils/constants.js should look
export const COLORS = {
  pinkVeryLight: '#FFECF5',
  pinkLight: '#FFD3EB',
  pinkMediumLight: '#FFACD8',
  pinkMediumDark: '#FF7CCB',
  pinkDark: '#FF0099',
  textDark: '#333333',
  textLight: '#FFFFFF',
  shadowLight: 'rgba(0, 0, 0, 0.08)',
  shadowMedium: 'rgba(0, 0, 0, 0.15)',
  // You didn't explicitly define 'borderColor' or 'deleteColor' in your provided COLORS object,
  // but I'll set them based on your CSS usage to be consistent
  borderColor: '#FFD3EB', // Using pinkLight as a general border color
  deleteColor: '#dc3545', // Standard red
};