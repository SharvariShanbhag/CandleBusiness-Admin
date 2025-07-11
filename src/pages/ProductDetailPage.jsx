// // // src/pages/ProductDetailPage.jsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { getProductById } from '../api/api';
// // import LoadingSpinner from '../components/LoadingSpinner';
// // import { getImageUrl } from '../utils/helpers';
// // import { COLORS } from '../utils/constants';
// // import { ArrowLeft } from 'lucide-react';
// // import toast from 'react-hot-toast';

// // const ProductDetailPage = ({ productId, setCurrentPage }) => {
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const fetchProduct = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const response = await getProductById(productId);
// //       setProduct(response.data.product);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Failed to fetch product details:', err);
// //       setError('Failed to load product details. Please try again.');
// //       toast.error('Failed to load product details.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [productId]);

// //   useEffect(() => {
// //     if (productId) {
// //       fetchProduct();
// //     }
// //   }, [productId, fetchProduct]);

// //   if (loading) {
// //     return <LoadingSpinner />;
// //   }

// //   if (error) {
// //     return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
// //   }

// //   if (!product) {
// //     return <div style={{ padding: '20px', textAlign: 'center', color: COLORS.textDark }}>Product not found.</div>;
// //   }

// //   return (
// //     <div style={productDetailPageStyle}>
// //       <button
// //         onClick={() => setCurrentPage('products')}
// //         style={backButtonStyle}
// //         onMouseOver={(e) => Object.assign(e.currentTarget.style, backButtonStyleHover)}
// //         onMouseOut={(e) => Object.assign(e.currentTarget.style, backButtonStyle)}
// //       >
// //         <ArrowLeft size={20} /> Back to Products
// //       </button>

// //       <div style={detailCardStyle} className="card">
// //         <img
// //           src={getImageUrl(product.image)}
// //           alt={product.name}
// //           style={detailImageStyle}
// //           onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/FFACD8/FF0099?text=No+Image" }}
// //         />
// //         <h2 style={detailTitleStyle}>{product.name}</h2>
// //         <p style={detailPriceStyle}>Price: ${product.price.toFixed(2)}</p>
// //         <p style={detailDescriptionStyle}>{product.description}</p>
// //         <div style={detailInfoGridStyle}>
// //           <div style={infoItemStyle}>
// //             <span style={infoLabelStyle}>Category:</span>
// //             <span style={infoValueStyle}>{product.category?.name || 'N/A'}</span> {/* Populated category name */}
// //           </div>
// //           <div style={infoItemStyle}>
// //             <span style={infoLabelStyle}>Stock:</span>
// //             <span style={infoValueStyle}>{product.stock}</span>
// //           </div>
// //           <div style={infoItemStyle}>
// //             <span style={infoLabelStyle}>Created At:</span>
// //             <span style={infoValueStyle}>{new Date(product.createdAt).toLocaleDateString()}</span>
// //           </div>
// //           <div style={infoItemStyle}>
// //             <span style={infoLabelStyle}>Last Updated:</span>
// //             <span style={infoValueStyle}>{new Date(product.updatedAt).toLocaleDateString()}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const productDetailPageStyle = {
// //   flexGrow: 1,
// //   padding: '30px',
// //   background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
// //   display: 'flex',
// //   flexDirection: 'column',
// //   alignItems: 'center',
// // };

// // const backButtonStyle = {
// //   backgroundColor: COLORS.pinkMediumLight,
// //   color: COLORS.textDark,
// //   padding: '10px 20px',
// //   borderRadius: '8px',
// //   fontSize: '0.9rem',
// //   fontWeight: 'bold',
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '8px',
// //   marginBottom: '30px',
// //   alignSelf: 'flex-start',
// //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// // };

// // const backButtonStyleHover = {
// //   backgroundColor: COLORS.pinkDark,
// //   color: COLORS.textLight,
// //   transform: 'translateX(-5px)',
// //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
// // };

// // const detailCardStyle = {
// //   backgroundColor: COLORS.pinkVeryLight,
// //   padding: '40px',
// //   borderRadius: '20px',
// //   boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
// //   textAlign: 'center',
// //   maxWidth: '700px',
// //   width: '100%',
// //   border: `1px solid ${COLORS.pinkMediumLight}`,
// //   display: 'flex',
// //   flexDirection: 'column',
// //   alignItems: 'center',
// // };

// // const detailImageStyle = {
// //   width: '250px',
// //   height: '250px',
// //   objectFit: 'cover',
// //   borderRadius: '15px',
// //   marginBottom: '25px',
// //   border: `3px solid ${COLORS.pinkMediumDark}`,
// //   boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
// // };

// // const detailTitleStyle = {
// //   color: COLORS.pinkDark,
// //   marginBottom: '15px',
// //   fontSize: '3rem',
// //   fontFamily: 'Dancing Script, cursive',
// //   textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
// // };

// // const detailPriceStyle = {
// //   fontSize: '1.8rem',
// //   color: COLORS.textDark,
// //   fontWeight: '700',
// //   marginBottom: '20px',
// // };

// // const detailDescriptionStyle = {
// //   fontSize: '1.1rem',
// //   color: COLORS.textDark,
// //   marginBottom: '30px',
// //   lineHeight: '1.7',
// //   textAlign: 'left',
// //   width: '100%',
// //   maxWidth: '500px',
// // };

// // const detailInfoGridStyle = {
// //   display: 'grid',
// //   gridTemplateColumns: '1fr 1fr',
// //   gap: '15px',
// //   width: '100%',
// //   maxWidth: '500px',
// //   borderTop: `1px dashed ${COLORS.pinkMediumLight}`,
// //   paddingTop: '20px',
// //   marginTop: '10px',
// // };

// // const infoItemStyle = {
// //   backgroundColor: COLORS.pinkLight,
// //   padding: '12px',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// //   display: 'flex',
// //   flexDirection: 'column',
// //   alignItems: 'flex-start',
// //   border: `1px solid ${COLORS.pinkMediumDark}`,
// // };

// // const infoLabelStyle = {
// //   fontWeight: 'bold',
// //   color: COLORS.pinkDark,
// //   fontSize: '0.9rem',
// //   marginBottom: '5px',
// // };

// // const infoValueStyle = {
// //   color: COLORS.textDark,
// //   fontSize: '1.0rem',
// //   wordBreak: 'break-word',
// // };

// // export default ProductDetailPage;

// // src/pages/ProductDetailPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getProductById } from '../api/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { COLORS } from '../utils/constants';
// import { getImageUrl } from '../utils/helpers';
// import toast from 'react-hot-toast';
// import { ArrowLeft } from 'lucide-react';

// const ProductDetailPage = () => {
//   const { productId } = useParams(); // Get product ID from URL
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchProduct = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await getProductById(productId);
//       setProduct(response.data.product);
//       setError(null);
//     } catch (err) {
//       console.error('Failed to fetch product:', err);
//       setError('Failed to load product details. Please try again.');
//       toast.error('Failed to load product details.');
//     } finally {
//       setLoading(false);
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (productId) {
//       fetchProduct();
//     }
//   }, [productId, fetchProduct]);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div style={{ padding: '20px', color: COLORS.deleteColor, textAlign: 'center' }}>{error}</div>;
//   }

//   if (!product) {
//     return <div style={{ padding: '20px', textAlign: 'center' }}>Product not found.</div>;
//   }

//   return (
//     <div style={productDetailPageStyle}>
//       <button onClick={() => navigate(-1)} style={backButtonStyle}>
//         <ArrowLeft size={20} /> Back to Products
//       </button>

//       <h2 style={pageTitleStyle}>Product Details</h2>

//       <div style={detailCardStyle}>
//         <img
//           src={getImageUrl(product.image)}
//           alt={product.name}
//           style={detailImageStyle}
//           onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/FFACD8/FF0099?text=No+Image" }}
//         />
//         <div style={detailContentStyle}>
//           <h3 style={detailNameStyle}>{product.name}</h3>
//           <p style={detailDescriptionStyle}>{product.description}</p>
//           <p style={detailPriceStyle}>Price: ${product.price?.toFixed(2)}</p>
//           <p style={detailCategoryStyle}>Category: {product.category?.name || 'N/A'}</p>
//           <p style={detailStockStyle}>Stock: {product.stock}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Styles for ProductDetailPage ---
// const productDetailPageStyle = {
//   flexGrow: 1,
//   padding: '30px',
//   background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
// };

// const backButtonStyle = {
//   backgroundColor: COLORS.pinkMediumLight,
//   color: COLORS.pinkDark,
//   padding: '10px 20px',
//   borderRadius: '8px',
//   fontSize: '1rem',
//   fontWeight: 'bold',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '8px',
//   cursor: 'pointer',
//   border: 'none',
//   transition: 'all 0.3s ease',
//   alignSelf: 'flex-start', // Align to the left
//   marginBottom: '20px',
//   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// };

// const pageTitleStyle = {
//   color: COLORS.pinkDark,
//   textAlign: 'center',
//   marginBottom: '30px',
//   fontSize: '2.8rem',
//   fontFamily: 'Dancing Script, cursive',
//   textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
// };

// const detailCardStyle = {
//   backgroundColor: COLORS.pinkVeryLight,
//   borderRadius: '15px',
//   boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
//   padding: '30px',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   maxWidth: '600px',
//   width: '100%',
//   gap: '25px',
// };

// const detailImageStyle = {
//   width: '250px',
//   height: '250px',
//   objectFit: 'cover',
//   borderRadius: '15px',
//   border: `3px solid ${COLORS.pinkMediumLight}`,
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// };

// const detailContentStyle = {
//   textAlign: 'center',
// };

// const detailNameStyle = {
//   color: COLORS.pinkDark,
//   fontSize: '2rem',
//   fontWeight: '700',
//   marginBottom: '15px',
// };

// const detailDescriptionStyle = {
//   fontSize: '1.1rem',
//   color: COLORS.textDark,
//   marginBottom: '20px',
//   lineHeight: '1.6',
// };

// const detailPriceStyle = {
//   fontSize: '1.5rem',
//   color: COLORS.pinkMediumDark,
//   fontWeight: 'bold',
//   marginBottom: '10px',
// };

// const detailCategoryStyle = {
//   fontSize: '1.1rem',
//   color: COLORS.textDark,
//   fontStyle: 'italic',
//   marginBottom: '5px',
// };

// const detailStockStyle = {
//   fontSize: '1.1rem',
//   color: COLORS.textDark,
//   fontWeight: '500',
// };

// export default ProductDetailPage;

// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getProductById } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { getImageUrl } from '../utils/helpers';
import { COLORS } from '../utils/constants';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailPage = ({ productId, setCurrentPage }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProductById(productId);
      setProduct(response.data.product);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch product details:', err);
      setError('Failed to load product details. Please try again.');
      toast.error('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  if (!product) {
    return <div style={{ padding: '20px', textAlign: 'center', color: COLORS.textDark }}>Product not found.</div>;
  }

  return (
    <div style={productDetailPageStyle}>
      <button
        onClick={() => setCurrentPage('products')}
        style={backButtonStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, backButtonStyleHover)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, backButtonStyle)}
      >
        <ArrowLeft size={20} /> Back to Products
      </button>

      <div style={detailCardStyle} className="card">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          style={detailImageStyle}
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/FFACD8/FF0099?text=No+Image" }}
        />
        <h2 style={detailTitleStyle}>{product.name}</h2>
        <p style={detailPriceStyle}>Price: ${product.price.toFixed(2)}</p>
        <p style={detailDescriptionStyle}>{product.description}</p>
        <div style={detailInfoGridStyle}>
          <div style={infoItemStyle}>
            <span style={infoLabelStyle}>Category:</span>
            <span style={infoValueStyle}>{product.category?.name || 'N/A'}</span> {/* Populated category name */}
          </div>
          <div style={infoItemStyle}>
            <span style={infoLabelStyle}>Stock:</span>
            <span style={infoValueStyle}>{product.stock}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={infoLabelStyle}>Created At:</span>
            <span style={infoValueStyle}>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={infoLabelStyle}>Last Updated:</span>
            <span style={infoValueStyle}>{new Date(product.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const productDetailPageStyle = {
  flexGrow: 1,
  padding: '30px',
  background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const backButtonStyle = {
  backgroundColor: COLORS.pinkMediumLight,
  color: COLORS.textDark,
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '30px',
  alignSelf: 'flex-start',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const backButtonStyleHover = {
  backgroundColor: COLORS.pinkDark,
  color: COLORS.textLight,
  transform: 'translateX(-5px)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
};

const detailCardStyle = {
  backgroundColor: COLORS.pinkVeryLight,
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  maxWidth: '700px',
  width: '100%',
  border: `1px solid ${COLORS.pinkMediumLight}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const detailImageStyle = {
  width: '250px',
  height: '250px',
  objectFit: 'cover',
  borderRadius: '15px',
  marginBottom: '25px',
  border: `3px solid ${COLORS.pinkMediumDark}`,
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
};

const detailTitleStyle = {
  color: COLORS.pinkDark,
  marginBottom: '15px',
  fontSize: '3rem',
  fontFamily: 'Dancing Script, cursive',
  textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
};

const detailPriceStyle = {
  fontSize: '1.8rem',
  color: COLORS.textDark,
  fontWeight: '700',
  marginBottom: '20px',
};

const detailDescriptionStyle = {
  fontSize: '1.1rem',
  color: COLORS.textDark,
  marginBottom: '30px',
  lineHeight: '1.7',
  textAlign: 'left',
  width: '100%',
  maxWidth: '500px',
};

const detailInfoGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '15px',
  width: '100%',
  maxWidth: '500px',
  borderTop: `1px dashed ${COLORS.pinkMediumLight}`,
  paddingTop: '20px',
  marginTop: '10px',
};

const infoItemStyle = {
  backgroundColor: COLORS.pinkLight,
  padding: '12px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  border: `1px solid ${COLORS.pinkMediumDark}`,
};

const infoLabelStyle = {
  fontWeight: 'bold',
  color: COLORS.pinkDark,
  fontSize: '0.9rem',
  marginBottom: '5px',
};

const infoValueStyle = {
  color: COLORS.textDark,
  fontSize: '1.0rem',
  wordBreak: 'break-word',
};

export default ProductDetailPage;