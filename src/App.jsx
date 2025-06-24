// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './context/AuthContext';
import { COLORS } from './utils/constants';

const App = () => {
  const { user, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(''); // State to manage current displayed page
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // For products by category
  const [selectedProductId, setSelectedProductId] = useState(null); // For product detail page

  // Set initial page after auth check
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        setCurrentPage('profile'); // Default page after login
      } else {
        setCurrentPage('login'); // Redirect to login if not authenticated
      }
    }
  }, [user, authLoading]);

  // Handle sidebar navigation clicks
  const handleSidebarNavigation = (page) => {
    setCurrentPage(page);
    setSelectedCategoryId(null); // Reset category filter when navigating to general products/categories
    setSelectedProductId(null); // Reset product detail when navigating
  };

  // Render content based on currentPage state
  const renderPage = () => {
    if (authLoading) {
      return (
        <div style={fullScreenCenterStyle}>
          <LoadingSpinner />
        </div>
      );
    }

    if (!user) {
      return <LoginPage />;
    }

    // Render admin panel content
    switch (currentPage) {
      case 'profile':
        return <ProfilePage />;
      case 'categories':
        return <CategoriesPage setCurrentPage={handleSidebarNavigation} setSelectedCategoryId={setSelectedCategoryId} />;
      case 'products':
        return <ProductsPage selectedCategoryId={selectedCategoryId} setCurrentPage={handleSidebarNavigation} setSelectedProductId={setSelectedProductId} />;
      case 'productDetail':
        return <ProductDetailPage productId={selectedProductId} setCurrentPage={handleSidebarNavigation} />;
      default:
        return <ProfilePage />; // Fallback
    }
  };

  return (
    <div style={appContainerStyle}>
      {user && <Navbar />} {/* Show Navbar only if logged in */}
      <div style={mainContentAreaStyle}>
        {user && <Sidebar setCurrentPage={handleSidebarNavigation} />} {/* Show Sidebar only if logged in */}
        <main style={pageContentStyle}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: COLORS.pinkVeryLight,
};

const mainContentAreaStyle = {
  display: 'flex',
  flexGrow: 1,
  minHeight: 'calc(100vh - 70px)', /* Adjust based on Navbar height */
};

const pageContentStyle = {
  flexGrow: 1,
  padding: '0px', // Page components will handle their own padding
  display: 'flex',
  flexDirection: 'column',
};

const fullScreenCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100vw',
  backgroundColor: COLORS.pinkVeryLight,
};

export default App;