// // // // // src/pages/CategoriesPage.jsx
// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import { getAllCategories, createCategory, updateCategory, deleteCategory, getProductsByCategory } from '../api/api';
// // // // import LoadingSpinner from '../components/LoadingSpinner';
// // // // import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react'; // Icons
// // // // import { COLORS } from '../utils/constants';
// // // // import { getImageUrl } from '../utils/helpers';
// // // // import Modal from '../components/Modal';
// // // // import toast from 'react-hot-toast';

// // // // const CategoriesPage = ({ setCurrentPage, setSelectedCategoryId }) => {
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [currentCategory, setCurrentCategory] = useState(null); // For edit mode
// // // //   const [categoryName, setCategoryName] = useState('');
// // // //   const [categoryImage, setCategoryImage] = useState(null);
// // // //   const [imagePreview, setImagePreview] = useState(null);

// // // //   const fetchCategories = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const response = await getAllCategories();
// // // //       setCategories(response.data.categories);
// // // //       setError(null);
// // // //     } catch (err) {
// // // //       console.error('Failed to fetch categories:', err);
// // // //       setError('Failed to load categories. Please try again.');
// // // //       toast.error('Failed to load categories.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchCategories();
// // // //   }, [fetchCategories]);

// // // //   const handleFileChange = (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (file) {
// // // //       setCategoryImage(file);
// // // //       setImagePreview(URL.createObjectURL(file));
// // // //     } else {
// // // //       setCategoryImage(null);
// // // //       setImagePreview(null);
// // // //     }
// // // //   };

// // // //   const handleOpenModal = (category = null) => {
// // // //     setCurrentCategory(category);
// // // //     setCategoryName(category ? category.name : '');
// // // //     setCategoryImage(null); // Clear image input on open
// // // //     setImagePreview(category ? getImageUrl(category.image) : null);
// // // //     setIsModalOpen(true);
// // // //   };

// // // //   const handleCloseModal = () => {
// // // //     setIsModalOpen(false);
// // // //     setCurrentCategory(null);
// // // //     setCategoryName('');
// // // //     setCategoryImage(null);
// // // //     setImagePreview(null);
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!categoryName) {
// // // //       toast.error('Category name is required!');
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append('name', categoryName);
// // // //     if (categoryImage) {
// // // //       formData.append('image', categoryImage);
// // // //     }

// // // //     try {
// // // //       if (currentCategory) {
// // // //         await updateCategory(currentCategory._id, formData);
// // // //         toast.success('Category updated successfully!');
// // // //       } else {
// // // //         await createCategory(formData);
// // // //         toast.success('Category created successfully!');
// // // //       }
// // // //       fetchCategories();
// // // //       handleCloseModal();
// // // //     } catch (err) {
// // // //       console.error('Category operation failed:', err);
// // // //       toast.error(err.response?.data?.message || 'Failed to save category.');
// // // //     }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     if (window.confirm('Are you sure you want to delete this category? This will also delete associated products!')) {
// // // //       try {
// // // //         await deleteCategory(id);
// // // //         toast.success('Category deleted successfully!');
// // // //         fetchCategories();
// // // //       } catch (err) {
// // // //         console.error('Failed to delete category:', err);
// // // //         toast.error(err.response?.data?.message || 'Failed to delete category.');
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleViewProducts = (categoryId) => {
// // // //     setSelectedCategoryId(categoryId);
// // // //     setCurrentPage('products'); // Navigate to products page
// // // //   };

// // // //   if (loading) {
// // // //     return <LoadingSpinner />;
// // // //   }

// // // //   if (error) {
// // // //     return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
// // // //   }

// // // //   return (
// // // //     <div style={categoriesPageStyle}>
// // // //       <h2 style={pageTitleStyle}>Product Categories</h2>
// // // //       <button
// // // //         onClick={() => handleOpenModal()}
// // // //         style={addCategoryButtonStyle}
// // // //         onMouseOver={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyleHover)}
// // // //         onMouseOut={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyle)}
// // // //       >
// // // //         <PlusCircle size={20} /> Add New Category
// // // //       </button>

// // // //       {categories.length === 0 ? (
// // // //         <p style={{textAlign: 'center', marginTop: '30px', fontSize: '1.1rem', color: COLORS.textDark}}>No categories found. Add one!</p>
// // // //       ) : (
// // // //         <div style={categoryGridStyle}>
// // // //           {categories.map((category) => (
// // // //             <div key={category._id} style={categoryCardStyle} className="card">
// // // //               <img
// // // //                 src={getImageUrl(category.image)}
// // // //                 alt={category.name}
// // // //                 style={categoryImageStyle}
// // // //                 onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/FFACD8/FF0099?text=No+Image" }}
// // // //               />
// // // //               <h3 style={categoryNameStyle}>{category.name}</h3>
// // // //               <div style={categoryActionsStyle}>
// // // //                 <button
// // // //                   onClick={() => handleViewProducts(category._id)}
// // // //                   style={actionButtonStyle}
// // // //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('view'))}
// // // //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// // // //                   title="View Products"
// // // //                 >
// // // //                   <Eye size={18} />
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => handleOpenModal(category)}
// // // //                   style={actionButtonStyle}
// // // //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('edit'))}
// // // //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// // // //                   title="Edit Category"
// // // //                 >
// // // //                   <Edit size={18} />
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => handleDelete(category._id)}
// // // //                   style={actionButtonStyle}
// // // //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('delete'))}
// // // //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// // // //                   title="Delete Category"
// // // //                 >
// // // //                   <Trash2 size={18} />
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       <Modal
// // // //         isOpen={isModalOpen}
// // // //         onClose={handleCloseModal}
// // // //         title={currentCategory ? 'Edit Category' : 'Add New Category'}
// // // //       >
// // // //         <form onSubmit={handleSubmit} style={modalFormStyle}>
// // // //           <div style={modalInputGroupStyle}>
// // // //             <label htmlFor="categoryName" style={modalLabelStyle}>Category Name:</label>
// // // //             <input
// // // //               type="text"
// // // //               id="categoryName"
// // // //               value={categoryName}
// // // //               onChange={(e) => setCategoryName(e.target.value)}
// // // //               required
// // // //               style={modalInputStyle}
// // // //             />
// // // //           </div>
// // // //           <div style={modalInputGroupStyle}>
// // // //             <label htmlFor="categoryImage" style={modalLabelStyle}>Category Image:</label>
// // // //             <input
// // // //               type="file"
// // // //               id="categoryImage"
// // // //               accept="image/*"
// // // //               onChange={handleFileChange}
// // // //               style={fileInputStyle}
// // // //             />
// // // //             {imagePreview && (
// // // //               <img src={imagePreview} alt="Image Preview" style={imagePreviewStyle} />
// // // //             )}
// // // //             {currentCategory && !categoryImage && <p style={currentImageNoteStyle}>Current image will be used if no new image is selected.</p>}
// // // //           </div>
// // // //           <button
// // // //             type="submit"
// // // //             style={modalSubmitButtonStyle}
// // // //             onMouseOver={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyleHover)}
// // // //             onMouseOut={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyle)}
// // // //           >
// // // //             {currentCategory ? 'Update Category' : 'Create Category'}
// // // //           </button>
// // // //         </form>
// // // //       </Modal>
// // // //     </div>
// // // //   );
// // // // };

// // // // const categoriesPageStyle = {
// // // //   flexGrow: 1,
// // // //   padding: '30px',
// // // //   background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
// // // // };

// // // // const pageTitleStyle = {
// // // //   color: COLORS.pinkDark,
// // // //   textAlign: 'center',
// // // //   marginBottom: '30px',
// // // //   fontSize: '2.8rem',
// // // //   fontFamily: 'Dancing Script, cursive',
// // // //   textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
// // // // };

// // // // const addCategoryButtonStyle = {
// // // //   backgroundColor: COLORS.pinkMediumDark,
// // // //   color: COLORS.textLight,
// // // //   padding: '12px 25px',
// // // //   borderRadius: '10px',
// // // //   fontSize: '1rem',
// // // //   fontWeight: 'bold',
// // // //   display: 'flex',
// // // //   alignItems: 'center',
// // // //   gap: '8px',
// // // //   margin: '0 auto 40px auto',
// // // //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
// // // // };

// // // // const addCategoryButtonStyleHover = {
// // // //   backgroundColor: COLORS.pinkDark,
// // // //   transform: 'translateY(-3px)',
// // // //   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
// // // // };

// // // // const categoryGridStyle = {
// // // //   display: 'grid',
// // // //   gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
// // // //   gap: '25px',
// // // //   justifyContent: 'center',
// // // //   alignItems: 'flex-start',
// // // //   padding: '0 20px',
// // // // };

// // // // const categoryCardStyle = {
// // // //   backgroundColor: COLORS.pinkVeryLight,
// // // //   borderRadius: '50%', /* Make it circular */
// // // //   width: '180px', /* Fixed width for circular shape */
// // // //   height: '180px', /* Fixed height for circular shape */
// // // //   display: 'flex',
// // // //   flexDirection: 'column',
// // // //   justifyContent: 'center',
// // // //   alignItems: 'center',
// // // //   overflow: 'hidden', /* Hide overflowing image parts */
// // // //   padding: '15px',
// // // //   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
// // // //   border: `2px solid ${COLORS.pinkLight}`,
// // // //   position: 'relative', /* For actions overlay or positioning */
// // // //   transition: 'all 0.3s ease',
// // // //   margin: 'auto', /* Center cards in grid cells */
// // // //   flexShrink: 0, /* Prevent shrinking if content is too large */
// // // // };

// // // // const categoryCardStyleHover = {
// // // //   transform: 'scale(1.05)',
// // // //   boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
// // // // };

// // // // categoryCardStyle.onmouseover = (e) => Object.assign(e.currentTarget.style, categoryCardStyleHover);
// // // // categoryCardStyle.onmouseout = (e) => Object.assign(e.currentTarget.style, categoryCardStyle);


// // // // const categoryImageStyle = {
// // // //   width: '100px',
// // // //   height: '100px',
// // // //   borderRadius: '50%', /* Keep image circular inside circle card */
// // // //   objectFit: 'cover',
// // // //   marginBottom: '10px',
// // // //   border: `2px solid ${COLORS.pinkMediumLight}`,
// // // //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// // // // };

// // // // const categoryNameStyle = {
// // // //   color: COLORS.pinkDark,
// // // //   fontSize: '1.2rem',
// // // //   fontWeight: '600',
// // // //   textAlign: 'center',
// // // //   wordBreak: 'break-word', /* Handle long names */
// // // //   lineHeight: '1.3',
// // // //   maxHeight: '2.6em', /* Limit to two lines */
// // // //   overflow: 'hidden',
// // // //   textOverflow: 'ellipsis',
// // // // };

// // // // const categoryActionsStyle = {
// // // //   position: 'absolute',
// // // //   bottom: '10px',
// // // //   left: '50%',
// // // //   transform: 'translateX(-50%)',
// // // //   display: 'flex',
// // // //   gap: '8px',
// // // //   backgroundColor: 'rgba(255, 255, 255, 0.8)', /* Semi-transparent background for buttons */
// // // //   borderRadius: '8px',
// // // //   padding: '5px',
// // // //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// // // // };

// // // // const actionButtonStyle = {
// // // //   backgroundColor: COLORS.pinkLight,
// // // //   color: COLORS.pinkDark,
// // // //   padding: '6px',
// // // //   borderRadius: '6px',
// // // //   display: 'flex',
// // // //   alignItems: 'center',
// // // //   justifyContent: 'center',
// // // //   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
// // // // };

// // // // const actionButtonStyleHover = (type) => {
// // // //   let bgColor;
// // // //   if (type === 'view') bgColor = COLORS.pinkMediumDark;
// // // //   else if (type === 'edit') bgColor = COLORS.pinkMediumDark;
// // // //   else if (type === 'delete') bgColor = '#dc3545'; // A red for delete
// // // //   return {
// // // //     backgroundColor: bgColor,
// // // //     color: COLORS.textLight,
// // // //     transform: 'scale(1.1)',
// // // //     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
// // // //   };
// // // // };

// // // // const modalFormStyle = {
// // // //   display: 'flex',
// // // //   flexDirection: 'column',
// // // //   gap: '20px',
// // // // };

// // // // const modalInputGroupStyle = {
// // // //   marginBottom: '15px',
// // // // };

// // // // const modalLabelStyle = {
// // // //   display: 'block',
// // // //   marginBottom: '8px',
// // // //   fontWeight: '600',
// // // //   color: COLORS.textDark,
// // // // };

// // // // const modalInputStyle = {
// // // //   width: '100%',
// // // //   padding: '10px 15px',
// // // //   border: `1px solid ${COLORS.pinkMediumLight}`,
// // // //   borderRadius: '8px',
// // // //   backgroundColor: COLORS.pinkVeryLight,
// // // // };

// // // // const fileInputStyle = {
// // // //   padding: '8px 0',
// // // //   border: 'none',
// // // //   backgroundColor: 'transparent',
// // // //   width: '100%',
// // // //   color: COLORS.textDark,
// // // // };

// // // // const imagePreviewStyle = {
// // // //   marginTop: '15px',
// // // //   maxWidth: '150px',
// // // //   maxHeight: '150px',
// // // //   borderRadius: '8px',
// // // //   objectFit: 'cover',
// // // //   border: `1px solid ${COLORS.pinkMediumLight}`,
// // // // };

// // // // const currentImageNoteStyle = {
// // // //   marginTop: '10px',
// // // //   fontSize: '0.9rem',
// // // //   color: COLORS.textDark,
// // // // };

// // // // const modalSubmitButtonStyle = {
// // // //   backgroundColor: COLORS.pinkDark,
// // // //   color: COLORS.textLight,
// // // //   padding: '12px 25px',
// // // //   borderRadius: '10px',
// // // //   fontSize: '1rem',
// // // //   fontWeight: 'bold',
// // // //   marginTop: '20px',
// // // //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
// // // // };

// // // // const modalSubmitButtonStyleHover = {
// // // //   backgroundColor: COLORS.pinkMediumDark,
// // // //   transform: 'translateY(-2px)',
// // // //   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
// // // // };

// // // // export default CategoriesPage;


// // // // src/pages/CategoriesPage.jsx
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { getAllCategories, createCategory, updateCategory, deleteCategory, getProductsByCategory } from '../api/api';
// // // import LoadingSpinner from '../components/LoadingSpinner';
// // // import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react'; // Icons
// // // import { COLORS } from '../utils/constants';
// // // import { getImageUrl } from '../utils/helpers'; // Ensure this import is correct
// // // import Modal from '../components/Modal';
// // // import toast from 'react-hot-toast';

// // // const CategoriesPage = ({ setCurrentPage, setSelectedCategoryId }) => {
// // //   const [categories, setCategories] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [currentCategory, setCurrentCategory] = useState(null); // For edit mode
// // //   const [categoryName, setCategoryName] = useState('');
// // //   const [categoryImage, setCategoryImage] = useState(null);
// // //   const [imagePreview, setImagePreview] = useState(null);

// // //   const fetchCategories = useCallback(async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await getAllCategories();
// // //       setCategories(response.data.categories);
// // //       setError(null);
// // //     } catch (err) {
// // //       console.error('Failed to fetch categories:', err);
// // //       setError('Failed to load categories. Please try again.');
// // //       toast.error('Failed to load categories.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchCategories();
// // //   }, [fetchCategories]);

// // //   const handleFileChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       setCategoryImage(file);
// // //       setImagePreview(URL.createObjectURL(file));
// // //     } else {
// // //       setCategoryImage(null);
// // //       setImagePreview(null);
// // //     }
// // //   };

// // //   const handleOpenModal = (category = null) => {
// // //     setCurrentCategory(category);
// // //     setCategoryName(category ? category.name : '');
// // //     setCategoryImage(null); // Clear image input on open
// // //     // If editing, set imagePreview to the existing image URL
// // //     setImagePreview(category ? getImageUrl(category.image) : null);
// // //     setIsModalOpen(true);
// // //   };

// // //   const handleCloseModal = () => {
// // //     setIsModalOpen(false);
// // //     setCurrentCategory(null);
// // //     setCategoryName('');
// // //     setCategoryImage(null);
// // //     setImagePreview(null);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!categoryName) {
// // //       toast.error('Category name is required!');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('name', categoryName);
// // //     if (categoryImage) {
// // //       formData.append('image', categoryImage); // Append the actual File object
// // //     } else if (currentCategory && currentCategory.image && !categoryImage) {
// // //       // If editing and no new image is selected, and there was an existing image,
// // //       // you might need a way to tell the backend to keep the old image.
// // //       // This often handled by the backend: if 'image' field is missing in update,
// // //       // it assumes no change. If a string is sent, it might interpret as "no image"
// // //       // or an image path. Sending a File object is for *new* uploads.
// // //       // Make sure your backend correctly handles update without new image file.
// // //       // No need to append currentCategory.image here unless your backend expects it for "no change".
// // //     }


// // //     try {
// // //       if (currentCategory) {
// // //         await updateCategory(currentCategory._id, formData);
// // //         toast.success('Category updated successfully!');
// // //       } else {
// // //         await createCategory(formData);
// // //         toast.success('Category created successfully!');
// // //       }
// // //       fetchCategories();
// // //       handleCloseModal();
// // //     } catch (err) {
// // //       console.error('Category operation failed:', err);
// // //       toast.error(err.response?.data?.message || 'Failed to save category.');
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if (window.confirm('Are you sure you want to delete this category? This will also delete associated products!')) {
// // //       try {
// // //         await deleteCategory(id);
// // //         toast.success('Category deleted successfully!');
// // //         fetchCategories();
// // //       } catch (err) {
// // //         console.error('Failed to delete category:', err);
// // //         toast.error(err.response?.data?.message || 'Failed to delete category.');
// // //       }
// // //     }
// // //   };

// // //   const handleViewProducts = (categoryId) => {
// // //     setSelectedCategoryId(categoryId);
// // //     setCurrentPage('products'); // Navigate to products page
// // //   };

// // //   if (loading) {
// // //     return <LoadingSpinner />;
// // //   }

// // //   if (error) {
// // //     return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
// // //   }

// // //   return (
// // //     <div style={categoriesPageStyle}>
// // //       <h2 style={pageTitleStyle}>Product Categories</h2>
// // //       <button
// // //         onClick={() => handleOpenModal()}
// // //         style={addCategoryButtonStyle}
// // //         onMouseOver={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyleHover)}
// // //         onMouseOut={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyle)}
// // //       >
// // //         <PlusCircle size={20} /> Add New Category
// // //       </button>

// // //       {categories.length === 0 ? (
// // //         <p style={{textAlign: 'center', marginTop: '30px', fontSize: '1.1rem', color: COLORS.textDark}}>No categories found. Add one!</p>
// // //       ) : (
// // //         <div style={categoryGridStyle}>
// // //           {categories.map((category) => (
// // //             <div key={category._id} style={categoryCardStyle} className="card">
// // //               <img
// // //                 src={getImageUrl(category.image)} // Using the helper to get full URL
// // //                 alt={category.name}
// // //                 style={categoryImageStyle}
// // //                 onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/FFACD8/FF0099?text=No+Image" }}
// // //               />
// // //               <h3 style={categoryNameStyle}>{category.name}</h3>
// // //               <div style={categoryActionsStyle}>
// // //                 <button
// // //                   onClick={() => handleViewProducts(category._id)}
// // //                   style={actionButtonStyle}
// // //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('view'))}
// // //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// // //                   title="View Products"
// // //                 >
// // //                   <Eye size={18} />
// // //                 </button>
// // //                 <button
// // //                   onClick={() => handleOpenModal(category)}
// // //                   style={actionButtonStyle}
// // //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('edit'))}
// // //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// // //                   title="Edit Category"
// // //                 >
// // //                   <Edit size={18} />
// // //                 </button>
// // //                 <button
// // //                   onClick={() => handleDelete(category._id)}
// // //                   style={actionButtonStyle}
// // //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('delete'))}
// // //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// // //                   title="Delete Category"
// // //                 >
// // //                   <Trash2 size={18} />
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       <Modal
// // //         isOpen={isModalOpen}
// // //         onClose={handleCloseModal}
// // //         title={currentCategory ? 'Edit Category' : 'Add New Category'}
// // //       >
// // //         <form onSubmit={handleSubmit} style={modalFormStyle}>
// // //           <div style={modalInputGroupStyle}>
// // //             <label htmlFor="categoryName" style={modalLabelStyle}>Category Name:</label>
// // //             <input
// // //               type="text"
// // //               id="categoryName"
// // //               value={categoryName}
// // //               onChange={(e) => setCategoryName(e.target.value)}
// // //               required
// // //               style={modalInputStyle}
// // //             />
// // //           </div>
// // //           <div style={modalInputGroupStyle}>
// // //             <label htmlFor="categoryImage" style={modalLabelStyle}>Category Image:</label>
// // //             <input
// // //               type="file"
// // //               id="categoryImage"
// // //               accept="image/*"
// // //               onChange={handleFileChange}
// // //               style={fileInputStyle}
// // //             />
// // //             {imagePreview && (
// // //               <img src={imagePreview} alt="Image Preview" style={imagePreviewStyle} />
// // //             )}
// // //             {currentCategory && !categoryImage && <p style={currentImageNoteStyle}>Current image will be used if no new image is selected.</p>}
// // //           </div>
// // //           <button
// // //             type="submit"
// // //             style={modalSubmitButtonStyle}
// // //             onMouseOver={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyleHover)}
// // //             onMouseOut={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyle)}
// // //           >
// // //             {currentCategory ? 'Update Category' : 'Create Category'}
// // //           </button>
// // //         </form>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // // All your existing styles here (they are already correct)
// // // const categoriesPageStyle = {
// // //     flexGrow: 1,
// // //     padding: '30px',
// // //     background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
// // // };

// // // const pageTitleStyle = {
// // //     color: COLORS.pinkDark,
// // //     textAlign: 'center',
// // //     marginBottom: '30px',
// // //     fontSize: '2.8rem',
// // //     fontFamily: 'Dancing Script, cursive',
// // //     textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
// // // };

// // // const addCategoryButtonStyle = {
// // //     backgroundColor: COLORS.pinkMediumDark,
// // //     color: COLORS.textLight,
// // //     padding: '12px 25px',
// // //     borderRadius: '10px',
// // //     fontSize: '1rem',
// // //     fontWeight: 'bold',
// // //     display: 'flex',
// // //     alignItems: 'center',
// // //     gap: '8px',
// // //     margin: '0 auto 40px auto',
// // //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
// // //     border: 'none',
// // //     cursor: 'pointer',
// // //     transition: 'all 0.2s ease-in-out',
// // // };

// // // const addCategoryButtonStyleHover = {
// // //     backgroundColor: COLORS.pinkDark,
// // //     transform: 'translateY(-3px)',
// // //     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
// // // };

// // // const categoryGridStyle = {
// // //     display: 'grid',
// // //     gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
// // //     gap: '25px',
// // //     justifyContent: 'center',
// // //     alignItems: 'flex-start',
// // //     padding: '0 20px',
// // // };

// // // const categoryCardStyle = {
// // //     backgroundColor: COLORS.pinkVeryLight,
// // //     borderRadius: '50%', /* Make it circular */
// // //     width: '180px', /* Fixed width for circular shape */
// // //     height: '180px', /* Fixed height for circular shape */
// // //     display: 'flex',
// // //     flexDirection: 'column',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     overflow: 'hidden', /* Hide overflowing image parts */
// // //     padding: '15px',
// // //     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
// // //     border: `2px solid ${COLORS.pinkLight}`,
// // //     position: 'relative', /* For actions overlay or positioning */
// // //     transition: 'all 0.3s ease',
// // //     margin: 'auto', /* Center cards in grid cells */
// // //     flexShrink: 0, /* Prevent shrinking if content is too large */
// // // };

// // // const categoryCardStyleHover = {
// // //     transform: 'scale(1.05)',
// // //     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
// // // };

// // // // Re-apply hover effects using onMouseOver/onMouseOut in JSX, not directly on style objects.
// // // // If you're applying these directly in JSX, remove these lines or they will be overwritten.
// // // // categoryCardStyle.onmouseover = (e) => Object.assign(e.currentTarget.style, categoryCardStyleHover);
// // // // categoryCardStyle.onmouseout = (e) => Object.assign(e.currentTarget.style, categoryCardStyle);


// // // const categoryImageStyle = {
// // //     width: '100px',
// // //     height: '100px',
// // //     borderRadius: '50%', /* Keep image circular inside circle card */
// // //     objectFit: 'cover',
// // //     marginBottom: '10px',
// // //     border: `2px solid ${COLORS.pinkMediumLight}`,
// // //     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// // // };

// // // const categoryNameStyle = {
// // //     color: COLORS.pinkDark,
// // //     fontSize: '1.2rem',
// // //     fontWeight: '600',
// // //     textAlign: 'center',
// // //     wordBreak: 'break-word', /* Handle long names */
// // //     lineHeight: '1.3',
// // //     maxHeight: '2.6em', /* Limit to two lines */
// // //     overflow: 'hidden',
// // //     textOverflow: 'ellipsis',
// // // };

// // // const categoryActionsStyle = {
// // //     position: 'absolute',
// // //     bottom: '10px',
// // //     left: '50%',
// // //     transform: 'translateX(-50%)',
// // //     display: 'flex',
// // //     gap: '8px',
// // //     backgroundColor: 'rgba(255, 255, 255, 0.8)', /* Semi-transparent background for buttons */
// // //     borderRadius: '8px',
// // //     padding: '5px',
// // //     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// // // };

// // // const actionButtonStyle = {
// // //     backgroundColor: COLORS.pinkLight,
// // //     color: COLORS.pinkDark,
// // //     padding: '6px',
// // //     borderRadius: '6px',
// // //     display: 'flex',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
// // //     border: 'none',
// // //     cursor: 'pointer',
// // //     transition: 'all 0.2s ease-in-out',
// // // };

// // // const actionButtonStyleHover = (type) => {
// // //     let bgColor;
// // //     let textColor = COLORS.textLight;
// // //     if (type === 'view') bgColor = COLORS.pinkMediumDark;
// // //     else if (type === 'edit') bgColor = COLORS.pinkMediumDark;
// // //     else if (type === 'delete') {
// // //       bgColor = '#dc3545'; // A red for delete
// // //       textColor = COLORS.textLight; // Ensure text is white on red
// // //     }
// // //     return {
// // //         backgroundColor: bgColor,
// // //         color: textColor,
// // //         transform: 'scale(1.1)',
// // //         boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
// // //     };
// // // };

// // // const modalFormStyle = {
// // //     display: 'flex',
// // //     flexDirection: 'column',
// // //     gap: '20px',
// // // };

// // // const modalInputGroupStyle = {
// // //     marginBottom: '15px',
// // // };

// // // const modalLabelStyle = {
// // //     display: 'block',
// // //     marginBottom: '8px',
// // //     fontWeight: '600',
// // //     color: COLORS.textDark,
// // // };

// // // const modalInputStyle = {
// // //     width: '100%',
// // //     padding: '10px 15px',
// // //     border: `1px solid ${COLORS.pinkMediumLight}`,
// // //     borderRadius: '8px',
// // //     backgroundColor: COLORS.pinkVeryLight,
// // //     boxSizing: 'border-box', // Include padding in width
// // //     color: COLORS.textDark,
// // // };

// // // const fileInputStyle = {
// // //     padding: '8px 0',
// // //     border: 'none',
// // //     backgroundColor: 'transparent',
// // //     width: '100%',
// // //     color: COLORS.textDark,
// // // };

// // // const imagePreviewStyle = {
// // //     marginTop: '15px',
// // //     maxWidth: '150px',
// // //     maxHeight: '150px',
// // //     borderRadius: '8px',
// // //     objectFit: 'cover',
// // //     border: `1px solid ${COLORS.pinkMediumLight}`,
// // // };

// // // const currentImageNoteStyle = {
// // //     marginTop: '10px',
// // //     fontSize: '0.9rem',
// // //     color: COLORS.textDark,
// // // };

// // // const modalSubmitButtonStyle = {
// // //     backgroundColor: COLORS.pinkDark,
// // //     color: COLORS.textLight,
// // //     padding: '12px 25px',
// // //     borderRadius: '10px',
// // //     fontSize: '1rem',
// // //     fontWeight: 'bold',
// // //     marginTop: '20px',
// // //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
// // //     border: 'none',
// // //     cursor: 'pointer',
// // //     transition: 'all 0.2s ease-in-out',
// // // };

// // // const modalSubmitButtonStyleHover = {
// // //     backgroundColor: COLORS.pinkMediumDark,
// // //     transform: 'translateY(-2px)',
// // //     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
// // // };

// // // export default CategoriesPage;


// // // src/pages/CategoriesPage.jsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { getAllCategories, createCategory, updateCategory, deleteCategory, getProductsByCategory } from '../api/api';
// // import LoadingSpinner from '../components/LoadingSpinner';
// // import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react'; // Icons
// // import { COLORS } from '../utils/constants';
// // import { getImageUrl } from '../utils/helpers'; // Ensure this import is correct
// // import Modal from '../components/Modal';
// // import toast from 'react-hot-toast';

// // const CategoriesPage = ({ setCurrentPage, setSelectedCategoryId }) => {
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [currentCategory, setCurrentCategory] = useState(null); // For edit mode
// //   const [categoryName, setCategoryName] = useState('');
// //   const [categoryImage, setCategoryImage] = useState(null);
// //   const [imagePreview, setImagePreview] = useState(null);

// //   const fetchCategories = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       // Ensure getAllCategories returns { data: { categories: [...] } }
// //       const response = await getAllCategories();
// //       setCategories(response.data.categories);
// //       setError(null);
// //     } catch (err) {
// //       console.error('Failed to fetch categories:', err);
// //       setError('Failed to load categories. Please try again.');
// //       toast.error('Failed to load categories.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchCategories();
// //   }, [fetchCategories]);

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setCategoryImage(file);
// //       setImagePreview(URL.createObjectURL(file));
// //     } else {
// //       setCategoryImage(null);
// //       setImagePreview(null);
// //     }
// //   };

// //   const handleOpenModal = (category = null) => {
// //     setCurrentCategory(category);
// //     setCategoryName(category ? category.name : '');
// //     setCategoryImage(null); // Clear image input on open
// //     // If editing, set imagePreview to the existing image URL
// //     setImagePreview(category ? getImageUrl(category.image) : null);
// //     setIsModalOpen(true);
// //   };

// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //     setCurrentCategory(null);
// //     setCategoryName('');
// //     setCategoryImage(null);
// //     setImagePreview(null);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!categoryName) {
// //       toast.error('Category name is required!');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('name', categoryName);
// //     if (categoryImage) {
// //       formData.append('image', categoryImage); // Append the actual File object
// //     } else if (currentCategory && currentCategory.image) {
// //         // If editing, no new image is selected, and there was an existing image,
// //         // send a flag or the old path to the backend to indicate "keep old image".
// //         // A common backend pattern is: if 'image' field is present and is a File, upload it.
// //         // If 'image' field is missing, assume keep existing.
// //         // If 'image' field is present but empty string/null, assume delete existing.
// //         // Your backend seems to handle missing 'image' field as "keep existing", which is good.
// //         // So, no need to append currentCategory.image here if you want to keep it.
// //     }


// //     try {
// //       if (currentCategory) {
// //         await updateCategory(currentCategory._id, formData);
// //         toast.success('Category updated successfully!');
// //       } else {
// //         await createCategory(formData);
// //         toast.success('Category created successfully!');
// //       }
// //       fetchCategories();
// //       handleCloseModal();
// //     } catch (err) {
// //       console.error('Category operation failed:', err);
// //       toast.error(err.response?.data?.message || 'Failed to save category.');
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this category? This will also delete associated products!')) {
// //       try {
// //         await deleteCategory(id);
// //         toast.success('Category deleted successfully!');
// //         fetchCategories();
// //       } catch (err) {
// //         console.error('Failed to delete category:', err);
// //         toast.error(err.response?.data?.message || 'Failed to delete category.');
// //       }
// //     }
// //   };

// //   const handleViewProducts = (categoryId) => {
// //     setSelectedCategoryId(categoryId);
// //     setCurrentPage('products'); // Navigate to products page
// //   };

// //   if (loading) {
// //     return <LoadingSpinner />;
// //   }

// //   if (error) {
// //     return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
// //   }

// //   return (
// //     <div style={categoriesPageStyle}>
// //       <h2 style={pageTitleStyle}>Product Categories</h2>
// //       <button
// //         onClick={() => handleOpenModal()}
// //         style={addCategoryButtonStyle}
// //         onMouseOver={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyleHover)}
// //         onMouseOut={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyle)}
// //       >
// //         <PlusCircle size={20} /> Add New Category
// //       </button>

// //       {categories.length === 0 ? (
// //         <p style={{textAlign: 'center', marginTop: '30px', fontSize: '1.1rem', color: COLORS.textDark}}>No categories found. Add one!</p>
// //       ) : (
// //         <div style={categoryGridStyle}>
// //           {categories.map((category) => (
// //             <div key={category._id} style={categoryCardStyle} className="card">
// //               <img
// //                 src={getImageUrl(category.image)} // Using the helper to get full URL
// //                 alt={category.name}
// //                 style={categoryImageStyle}
// //                 // Fallback for broken images. If getImageUrl returns a valid URL that
// //                 // still results in a 404 or fails, this provides a placeholder.
// //                 onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/FFACD8/FF0099?text=No+Image" }}
// //               />
// //               <h3 style={categoryNameStyle}>{category.name}</h3>
// //               <div style={categoryActionsStyle}>
// //                 <button
// //                   onClick={() => handleViewProducts(category._id)}
// //                   style={actionButtonStyle}
// //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('view'))}
// //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// //                   title="View Products"
// //                 >
// //                   <Eye size={18} />
// //                 </button>
// //                 <button
// //                   onClick={() => handleOpenModal(category)}
// //                   style={actionButtonStyle}
// //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('edit'))}
// //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// //                   title="Edit Category"
// //                 >
// //                   <Edit size={18} />
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(category._id)}
// //                   style={actionButtonStyle}
// //                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('delete'))}
// //                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
// //                   title="Delete Category"
// //                 >
// //                   <Trash2 size={18} />
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       <Modal
// //         isOpen={isModalOpen}
// //         onClose={handleCloseModal}
// //         title={currentCategory ? 'Edit Category' : 'Add New Category'}
// //       >
// //         <form onSubmit={handleSubmit} style={modalFormStyle}>
// //           <div style={modalInputGroupStyle}>
// //             <label htmlFor="categoryName" style={modalLabelStyle}>Category Name:</label>
// //             <input
// //               type="text"
// //               id="categoryName"
// //               value={categoryName}
// //               onChange={(e) => setCategoryName(e.target.value)}
// //               required
// //               style={modalInputStyle}
// //             />
// //           </div>
// //           <div style={modalInputGroupStyle}>
// //             <label htmlFor="categoryImage" style={modalLabelStyle}>Category Image:</label>
// //             <input
// //               type="file"
// //               id="categoryImage"
// //               accept="image/*"
// //               onChange={handleFileChange}
// //               style={fileInputStyle}
// //             />
// //             {imagePreview && (
// //               <img src={imagePreview} alt="Image Preview" style={imagePreviewStyle} />
// //             )}
// //             {currentCategory && !categoryImage && <p style={currentImageNoteStyle}>Current image will be used if no new image is selected.</p>}
// //           </div>
// //           <button
// //             type="submit"
// //             style={modalSubmitButtonStyle}
// //             onMouseOver={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyleHover)}
// //             onMouseOut={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyle)}
// //           >
// //             {currentCategory ? 'Update Category' : 'Create Category'}
// //           </button>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // // All your existing styles here (they are already correct)
// // const categoriesPageStyle = {
// //     flexGrow: 1,
// //     padding: '30px',
// //     background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
// // };

// // const pageTitleStyle = {
// //     color: COLORS.pinkDark,
// //     textAlign: 'center',
// //     marginBottom: '30px',
// //     fontSize: '2.8rem',
// //     fontFamily: 'Dancing Script, cursive',
// //     textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
// // };

// // const addCategoryButtonStyle = {
// //     backgroundColor: COLORS.pinkMediumDark,
// //     color: COLORS.textLight,
// //     padding: '12px 25px',
// //     borderRadius: '10px',
// //     fontSize: '1rem',
// //     fontWeight: 'bold',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '8px',
// //     margin: '0 auto 40px auto',
// //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
// //     border: 'none',
// //     cursor: 'pointer',
// //     transition: 'all 0.2s ease-in-out',
// // };

// // const addCategoryButtonStyleHover = {
// //     backgroundColor: COLORS.pinkDark,
// //     transform: 'translateY(-3px)',
// //     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
// // };

// // const categoryGridStyle = {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
// //     gap: '25px',
// //     justifyContent: 'center',
// //     alignItems: 'flex-start',
// //     padding: '0 20px',
// // };

// // const categoryCardStyle = {
// //     backgroundColor: COLORS.pinkVeryLight,
// //     borderRadius: '50%', /* Make it circular */
// //     width: '180px', /* Fixed width for circular shape */
// //     height: '180px', /* Fixed height for circular shape */
// //     display: 'flex',
// //     flexDirection: 'column',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     overflow: 'hidden', /* Hide overflowing image parts */
// //     padding: '15px',
// //     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
// //     border: `2px solid ${COLORS.pinkLight}`,
// //     position: 'relative', /* For actions overlay or positioning */
// //     transition: 'all 0.3s ease',
// //     margin: 'auto', /* Center cards in grid cells */
// //     flexShrink: 0, /* Prevent shrinking if content is too large */
// // };

// // const categoryCardStyleHover = {
// //     transform: 'scale(1.05)',
// //     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
// // };

// // const categoryImageStyle = {
// //     width: '100px',
// //     height: '100px',
// //     borderRadius: '50%', /* Keep image circular inside circle card */
// //     objectFit: 'cover',
// //     marginBottom: '10px',
// //     border: `2px solid ${COLORS.pinkMediumLight}`,
// //     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// // };

// // const categoryNameStyle = {
// //     color: COLORS.pinkDark,
// //     fontSize: '1.2rem',
// //     fontWeight: '600',
// //     textAlign: 'center',
// //     wordBreak: 'break-word', /* Handle long names */
// //     lineHeight: '1.3',
// //     maxHeight: '2.6em', /* Limit to two lines */
// //     overflow: 'hidden',
// //     textOverflow: 'ellipsis',
// // };

// // const categoryActionsStyle = {
// //     position: 'absolute',
// //     bottom: '10px',
// //     left: '50%',
// //     transform: 'translateX(-50%)',
// //     display: 'flex',
// //     gap: '8px',
// //     backgroundColor: 'rgba(255, 255, 255, 0.8)', /* Semi-transparent background for buttons */
// //     borderRadius: '8px',
// //     padding: '5px',
// //     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// // };

// // const actionButtonStyle = {
// //     backgroundColor: COLORS.pinkLight,
// //     color: COLORS.pinkDark,
// //     padding: '6px',
// //     borderRadius: '6px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
// //     border: 'none',
// //     cursor: 'pointer',
// //     transition: 'all 0.2s ease-in-out',
// // };

// // const actionButtonStyleHover = (type) => {
// //     let bgColor;
// //     let textColor = COLORS.textLight;
// //     if (type === 'view') bgColor = COLORS.pinkMediumDark;
// //     else if (type === 'edit') bgColor = COLORS.pinkMediumDark;
// //     else if (type === 'delete') {
// //       bgColor = '#dc3545'; // A red for delete
// //       textColor = COLORS.textLight; // Ensure text is white on red
// //     }
// //     return {
// //         backgroundColor: bgColor,
// //         color: textColor,
// //         transform: 'scale(1.1)',
// //         boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
// //     };
// // };

// // const modalFormStyle = {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     gap: '20px',
// // };

// // const modalInputGroupStyle = {
// //     marginBottom: '15px',
// // };

// // const modalLabelStyle = {
// //     display: 'block',
// //     marginBottom: '8px',
// //     fontWeight: '600',
// //     color: COLORS.textDark,
// // };

// // const modalInputStyle = {
// //     width: '100%',
// //     padding: '10px 15px',
// //     border: `1px solid ${COLORS.pinkMediumLight}`,
// //     borderRadius: '8px',
// //     backgroundColor: COLORS.pinkVeryLight,
// //     boxSizing: 'border-box', // Include padding in width
// //     color: COLORS.textDark,
// // };

// // const fileInputStyle = {
// //     padding: '8px 0',
// //     border: 'none',
// //     backgroundColor: 'transparent',
// //     width: '100%',
// //     color: COLORS.textDark,
// // };

// // const imagePreviewStyle = {
// //     marginTop: '15px',
// //     maxWidth: '150px',
// //     maxHeight: '150px',
// //     borderRadius: '8px',
// //     objectFit: 'cover',
// //     border: `1px solid ${COLORS.pinkMediumLight}`,
// // };

// // const currentImageNoteStyle = {
// //     marginTop: '10px',
// //     fontSize: '0.9rem',
// //     color: COLORS.textDark,
// // };

// // const modalSubmitButtonStyle = {
// //     backgroundColor: COLORS.pinkDark,
// //     color: COLORS.textLight,
// //     padding: '12px 25px',
// //     borderRadius: '10px',
// //     fontSize: '1rem',
// //     fontWeight: 'bold',
// //     marginTop: '20px',
// //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
// //     border: 'none',
// //     cursor: 'pointer',
// //     transition: 'all 0.2s ease-in-out',
// // };

// // const modalSubmitButtonStyleHover = {
// //     backgroundColor: COLORS.pinkMediumDark,
// //     transform: 'translateY(-2px)',
// //     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
// // };

// // export default CategoriesPage;

// // src/pages/CategoriesPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../api/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
// import { COLORS } from '../utils/constants';
// import { getImageUrl } from '../utils/helpers';
// import Modal from '../components/Modal';
// import toast from 'react-hot-toast';

// // Removed setCurrentPage and setSelectedCategoryId from props as they are no longer used for routing
// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState(null); // For edit mode
//   const [categoryName, setCategoryName] = useState('');
//   const [categoryImage, setCategoryImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await getAllCategories();
//       setCategories(response.data.categories);
//       setError(null);
//     } catch (err) {
//       console.error('Failed to fetch categories:', err);
//       setError('Failed to load categories. Please try again.');
//       toast.error('Failed to load categories.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCategoryImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     } else {
//       setCategoryImage(null);
//       setImagePreview(null);
//     }
//   };

//   const handleOpenModal = (category = null) => {
//     setCurrentCategory(category);
//     setCategoryName(category ? category.name : '');
//     setCategoryImage(null); // Clear image input on open
//     setImagePreview(category ? getImageUrl(category.image) : null);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setCurrentCategory(null);
//     setCategoryName('');
//     setCategoryImage(null);
//     setImagePreview(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!categoryName) {
//       toast.error('Category name is required!');
//       return;
//     }

//     if (!currentCategory) { // Create mode
//       if (!categoryImage) {
//         toast.error('Category image is required for new categories!');
//         return;
//       }
//     } else { // Edit mode
//       if (!categoryImage && !currentCategory.image) {
//         toast.error('Please select an image for this category or keep the existing one.');
//         return;
//       }
//     }

//     const formData = new FormData();
//     formData.append('name', categoryName);
//     if (categoryImage) {
//       formData.append('image', categoryImage);
//     }

//     try {
//       if (currentCategory) {
//         await updateCategory(currentCategory._id, formData);
//         toast.success('Category updated successfully!');
//       } else {
//         await createCategory(formData);
//         toast.success('Category created successfully!');
//       }
//       fetchCategories();
//       handleCloseModal();
//     } catch (err) {
//       console.error('Category operation failed:', err);
//       toast.error(err.response?.data?.message || 'Failed to save category.');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this category? This will also delete associated products!')) {
//       try {
//         await deleteCategory(id);
//         toast.success('Category deleted successfully!');
//         fetchCategories();
//       } catch (err) {
//         console.error('Failed to delete category:', err);
//         toast.error(err.response?.data?.message || 'Failed to delete category.');
//       }
//     }
//   };

//   // --- UPDATED: Use navigate for routing to products by category ---
//   const handleViewProducts = (categoryId) => {
//     navigate(`/products/category/${categoryId}`); // Navigate to the specific URL
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
//   }

//   return (
//     <div style={categoriesPageStyle}>
//       <style>{`
//         .category-card:hover {
//           transform: scale(1.05);
//           box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
//         }
//         .category-card:hover .category-actions {
//           opacity: 1;
//           pointer-events: auto;
//         }
//       `}</style>

//       <h2 style={pageTitleStyle}>Product Categories</h2>
//       <button
//         onClick={() => handleOpenModal()}
//         style={addCategoryButtonStyle}
//         onMouseOver={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyleHover)}
//         onMouseOut={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyle)}
//       >
//         <PlusCircle size={20} /> Add New Category
//       </button>

//       {categories.length === 0 ? (
//         <p style={{textAlign: 'center', marginTop: '30px', fontSize: '1.1rem', color: COLORS.textDark}}>No categories found. Add one!</p>
//       ) : (
//         <div style={categoryGridStyle}>
//           {categories.map((category) => (
//             <div
//               key={category._id}
//               style={categoryCardStyle}
//               className="category-card"
//             >
//               <img
//                 src={getImageUrl(category.image)}
//                 alt={category.name}
//                 style={categoryImageStyle}
//                 onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/FFACD8/FF0099?text=No+Image" }}
//               />
//               <h3 style={categoryNameStyle}>{category.name}</h3>
//               <div style={categoryActionsStyle} className="category-actions">
//                 <button
//                   onClick={(e) => { e.stopPropagation(); handleViewProducts(category._id); }}
//                   style={actionButtonStyle}
//                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('view'))}
//                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
//                   title="View Products"
//                 >
//                   <Eye size={18} />
//                 </button>
//                 <button
//                   onClick={(e) => { e.stopPropagation(); handleOpenModal(category); }}
//                   style={actionButtonStyle}
//                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('edit'))}
//                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
//                   title="Edit Category"
//                 >
//                   <Edit size={18} />
//                 </button>
//                 <button
//                   onClick={(e) => { e.stopPropagation(); handleDelete(category._id); }}
//                   style={actionButtonStyle}
//                   onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('delete'))}
//                   onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
//                   title="Delete Category"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         title={currentCategory ? 'Edit Category' : 'Add New Category'}
//       >
//         <form onSubmit={handleSubmit} style={modalFormStyle}>
//           <div style={modalInputGroupStyle}>
//             <label htmlFor="categoryName" style={modalLabelStyle}>Category Name:</label>
//             <input
//               type="text"
//               id="categoryName"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//               required
//               style={modalInputStyle}
//             />
//           </div>
//           <div style={modalInputGroupStyle}>
//             <label htmlFor="categoryImage" style={modalLabelStyle}>Category Image:</label>
//             <input
//               type="file"
//               id="categoryImage"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={fileInputStyle}
//             />
//             {imagePreview && (
//               <img src={imagePreview} alt="Image Preview" style={imagePreviewStyle} />
//             )}
//             {currentCategory && !categoryImage && <p style={currentImageNoteStyle}>Current image will be used if no new image is selected.</p>}
//           </div>
//           <button
//             type="submit"
//             style={modalSubmitButtonStyle}
//             onMouseOver={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyleHover)}
//             onMouseOut={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyle)}
//           >
//             {currentCategory ? 'Update Category' : 'Create Category'}
//           </button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// // Styles (unchanged from your original)
// const categoriesPageStyle = {
//   flexGrow: 1,
//   padding: '30px',
//   background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
// };

// const pageTitleStyle = {
//   color: COLORS.pinkDark,
//   textAlign: 'center',
//   marginBottom: '30px',
//   fontSize: '2.8rem',
//   fontFamily: 'Dancing Script, cursive',
//   textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
// };

// const addCategoryButtonStyle = {
//   backgroundColor: COLORS.pinkMediumDark,
//   color: COLORS.textLight,
//   padding: '12px 25px',
//   borderRadius: '10px',
//   fontSize: '1rem',
//   fontWeight: 'bold',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '8px',
//   margin: '0 auto 40px auto',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
//   cursor: 'pointer',
//   border: 'none',
//   transition: 'all 0.3s ease',
// };

// const addCategoryButtonStyleHover = {
//   backgroundColor: COLORS.pinkDark,
//   transform: 'translateY(-3px)',
//   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
// };

// const categoryGridStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//   gap: '30px',
//   justifyContent: 'center',
//   alignItems: 'flex-start',
//   padding: '0 20px',
// };

// const categoryCardStyle = {
//   backgroundColor: COLORS.pinkVeryLight,
//   borderRadius: '15px',
//   width: '200px',
//   height: '240px',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'flex-start',
//   alignItems: 'center',
//   overflow: 'hidden',
//   padding: '15px',
//   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//   border: `2px solid ${COLORS.pinkLight}`,
//   position: 'relative',
//   transition: 'all 0.3s ease',
//   margin: 'auto',
//   flexShrink: 0,
//   cursor: 'default',
// };

// const categoryImageStyle = {
//   width: '120px',
//   height: '120px',
//   borderRadius: '50%',
//   objectFit: 'cover',
//   marginBottom: '15px',
//   border: `2px solid ${COLORS.pinkMediumLight}`,
//   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
// };

// const categoryNameStyle = {
//   color: COLORS.pinkDark,
//   fontSize: '1.2rem',
//   fontWeight: '600',
//   textAlign: 'center',
//   wordBreak: 'break-word',
//   whiteSpace: 'normal',
//   overflowWrap: 'break-word',
//   lineHeight: '1.3em',
//   maxHeight: '3.9em',
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
//   flexGrow: 1,
//   marginBottom: '15px',
// };

// const categoryActionsStyle = {
//   position: 'absolute',
//   bottom: '10px',
//   left: '50%',
//   transform: 'translateX(-50%)',
//   display: 'flex',
//   gap: '8px',
//   backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   borderRadius: '10px',
//   padding: '8px',
//   boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
//   opacity: 0,
//   pointerEvents: 'none',
//   transition: 'opacity 0.3s ease',
// };

// const actionButtonStyle = {
//   backgroundColor: COLORS.pinkLight,
//   color: COLORS.pinkDark,
//   padding: '8px',
//   borderRadius: '8px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//   cursor: 'pointer',
//   border: 'none',
//   transition: 'all 0.3s ease',
// };

// const actionButtonStyleHover = (type) => {
//   let bgColor;
//   if (type === 'view') bgColor = COLORS.pinkMediumDark;
//   else if (type === 'edit') bgColor = COLORS.pinkMediumDark;
//   else if (type === 'delete') bgColor = '#dc3545';
//   return {
//     backgroundColor: bgColor,
//     color: COLORS.textLight,
//     transform: 'scale(1.1)',
//     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
//   };
// };

// const modalFormStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '20px',
// };

// const modalInputGroupStyle = {
//   marginBottom: '15px',
// };

// const modalLabelStyle = {
//   display: 'block',
//   marginBottom: '8px',
//   fontWeight: '600',
//   color: COLORS.textDark,
// };

// const modalInputStyle = {
//   width: '100%',
//   padding: '10px 15px',
//   border: `1px solid ${COLORS.pinkMediumLight}`,
//   borderRadius: '8px',
//   backgroundColor: COLORS.pinkVeryLight,
// };

// const fileInputStyle = {
//   padding: '8px 0',
//   border: 'none',
//   backgroundColor: 'transparent',
//   width: '100%',
//   color: COLORS.textDark,
// };

// const imagePreviewStyle = {
//   marginTop: '15px',
//   maxWidth: '150px',
//   maxHeight: '150px',
//   borderRadius: '8px',
//   objectFit: 'cover',
//   border: `1px solid ${COLORS.pinkMediumLight}`,
// };

// const currentImageNoteStyle = {
//   marginTop: '10px',
//   fontSize: '0.9rem',
//   color: COLORS.textDark,
// };

// const modalSubmitButtonStyle = {
//   backgroundColor: COLORS.pinkDark,
//   color: COLORS.textLight,
//   padding: '12px 25px',
//   borderRadius: '10px',
//   fontSize: '1rem',
//   fontWeight: 'bold',
//   marginTop: '20px',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
//   cursor: 'pointer',
//   border: 'none',
//   transition: 'all 0.3s ease',
// };

// const modalSubmitButtonStyleHover = {
//   backgroundColor: COLORS.pinkMediumDark,
//   transform: 'translateY(-2px)',
//   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
// };

// export default CategoriesPage;




// src/pages/CategoriesPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { PlusCircle, Edit, Trash2 } from 'lucide-react'; // Removed Eye icon here
import { COLORS } from '../utils/constants';
import { getImageUrl } from '../utils/helpers';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const CategoriesPage = ({ setCurrentPage, setSelectedCategoryId }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null); // For edit mode
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      setCategories(response.data.categories);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to load categories. Please try again.');
      toast.error('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setCategoryImage(null);
      setImagePreview(null);
    }
  };

  const handleOpenModal = (category = null) => {
    setCurrentCategory(category);
    setCategoryName(category ? category.name : '');
    setCategoryImage(null); // Clear image input on open
    setImagePreview(category ? getImageUrl(category.image) : null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setCategoryName('');
    setCategoryImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      toast.error('Category name is required!');
      return;
    }

    // Frontend validation for image requirement (if creating, or if updating and no existing image)
    if (!currentCategory) { // Create mode
      if (!categoryImage) {
        toast.error('Category image is required for new categories!');
        return;
      }
    } else { // Edit mode
      // If there's no current image and no new image, show error
      if (!categoryImage && !currentCategory.image) {
        toast.error('Please select an image for this category or keep the existing one.');
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    if (categoryImage) {
      formData.append('image', categoryImage);
    }

    try {
      if (currentCategory) {
        await updateCategory(currentCategory._id, formData);
        toast.success('Category updated successfully!');
      } else {
        await createCategory(formData);
        toast.success('Category created successfully!');
      }
      fetchCategories();
      handleCloseModal();
    } catch (err) {
      console.error('Category operation failed:', err);
      toast.error(err.response?.data?.message || 'Failed to save category.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? This will also delete associated products!')) {
      try {
        await deleteCategory(id);
        toast.success('Category deleted successfully!');
        fetchCategories();
      } catch (err) {
        console.error('Failed to delete category:', err);
        toast.error(err.response?.data?.message || 'Failed to delete category.');
      }
    }
  };

  const handleViewProducts = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage('products'); // Navigate to products page
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div style={categoriesPageStyle}>
      {/* Embedded CSS for hover effect on card and actions */}
      <style>{`
        .category-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
        }
        .category-card:hover .category-actions {
          opacity: 1;
          pointer-events: auto; /* Enable interactions */
        }
      `}</style>

      <h2 style={pageTitleStyle}>Product Categories</h2>
      <button
        onClick={() => handleOpenModal()}
        style={addCategoryButtonStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyleHover)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, addCategoryButtonStyle)}
      >
        <PlusCircle size={20} /> Add New Category
      </button>

      {categories.length === 0 ? (
        <p style={{textAlign: 'center', marginTop: '30px', fontSize: '1.1rem', color: COLORS.textDark}}>No categories found. Add one!</p>
      ) : (
        <div style={categoryGridStyle}>
          {categories.map((category) => (
            <div
              key={category._id}
              style={categoryCardStyle}
              className="category-card" // Added class for CSS hover
              onClick={() => handleViewProducts(category._id)} // Click entire card to view products
            >
              <img
                src={getImageUrl(category.image)}
                alt={category.name}
                style={categoryImageStyle}
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/FFACD8/FF0099?text=No+Image" }}
              />
              <h3 style={categoryNameStyle}>{category.name}</h3>
              <div style={categoryActionsStyle} className="category-actions"> {/* Added class for CSS hover */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleOpenModal(category); }} // Stop propagation to prevent card click
                  style={actionButtonStyle}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('edit'))}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
                  title="Edit Category"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(category._id); }} // Stop propagation to prevent card click
                  style={actionButtonStyle}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('delete'))}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
                  title="Delete Category"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} style={modalFormStyle}>
          <div style={modalInputGroupStyle}>
            <label htmlFor="categoryName" style={modalLabelStyle}>Category Name:</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              style={modalInputStyle}
            />
          </div>
          <div style={modalInputGroupStyle}>
            <label htmlFor="categoryImage" style={modalLabelStyle}>Category Image:</label>
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              onChange={handleFileChange}
              style={fileInputStyle}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Image Preview" style={imagePreviewStyle} />
            )}
            {currentCategory && !categoryImage && <p style={currentImageNoteStyle}>Current image will be used if no new image is selected.</p>}
          </div>
          <button
            type="submit"
            style={modalSubmitButtonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyleHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, modalSubmitButtonStyle)}
          >
            {currentCategory ? 'Update Category' : 'Create Category'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

// Styles (Adjusted for better UI)
const categoriesPageStyle = {
  flexGrow: 1,
  padding: '30px',
  background: `linear-gradient(135deg, ${COLORS.pinkVeryLight} 0%, ${COLORS.pinkLight} 100%)`,
};

const pageTitleStyle = {
  color: COLORS.pinkDark,
  textAlign: 'center',
  marginBottom: '30px',
  fontSize: '2.8rem',
  fontFamily: 'Dancing Script, cursive',
  textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
};

const addCategoryButtonStyle = {
  backgroundColor: COLORS.pinkMediumDark,
  color: COLORS.textLight,
  padding: '12px 25px',
  borderRadius: '10px',
  fontSize: '1rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  margin: '0 auto 40px auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.3s ease',
};

const addCategoryButtonStyleHover = {
  backgroundColor: COLORS.pinkDark,
  transform: 'translateY(-3px)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
};

const categoryGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Increased minmax for more space
  gap: '30px', // Increased gap
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 20px',
};

const categoryCardStyle = {
  backgroundColor: COLORS.pinkVeryLight,
  borderRadius: '15px', // Changed to rounded rectangle
  width: '200px', // Fixed width
  height: '240px', // Increased height to accommodate name and actions better
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Align content to the top
  alignItems: 'center',
  overflow: 'hidden',
  padding: '15px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  border: `2px solid ${COLORS.pinkLight}`,
  position: 'relative',
  transition: 'all 0.3s ease',
  margin: 'auto',
  flexShrink: 0,
  cursor: 'pointer', // Indicate card is clickable
};

// Removed categoryCardStyleHover as it's handled by CSS now

const categoryImageStyle = {
  width: '120px', // Slightly larger image
  height: '120px', // Slightly larger image
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '15px', // Space between image and name
  border: `2px solid ${COLORS.pinkMediumLight}`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const categoryNameStyle = {
  color: COLORS.pinkDark,
  fontSize: '1.2rem',
  fontWeight: '600',
  textAlign: 'center',
  wordBreak: 'break-word',
  whiteSpace: 'normal', // Allow text to wrap
  overflowWrap: 'break-word', // Ensure words break if too long
  lineHeight: '1.3em',
  maxHeight: '3.9em', // Limit to three lines (1.3em * 3)
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flexGrow: 1, // Allow name to take available space
  marginBottom: '15px', // Space between name and action buttons
};

const categoryActionsStyle = {
  position: 'absolute',
  bottom: '10px', // Position at the bottom of the card
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '10px', // Increased gap between buttons
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // More opaque background for buttons on hover
  borderRadius: '10px', // Slightly larger border-radius
  padding: '8px', // Increased padding
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)', // Stronger shadow
  opacity: 0, // Initially hidden
  pointerEvents: 'none', // Prevents interaction when hidden
  transition: 'opacity 0.3s ease', // Smooth transition for visibility
};

const actionButtonStyle = {
  backgroundColor: COLORS.pinkLight,
  color: COLORS.pinkDark,
  padding: '8px', // Increased padding
  borderRadius: '8px', // Slightly larger border-radius
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.3s ease',
};

const actionButtonStyleHover = (type) => {
  let bgColor;
  if (type === 'edit') bgColor = COLORS.pinkMediumDark;
  else if (type === 'delete') bgColor = '#dc3545'; // A red for delete
  return {
    backgroundColor: bgColor,
    color: COLORS.textLight,
    transform: 'scale(1.1)',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  };
};

const modalFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const modalInputGroupStyle = {
  marginBottom: '15px',
};

const modalLabelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  color: COLORS.textDark,
};

const modalInputStyle = {
  width: '100%',
  padding: '10px 15px',
  border: `1px solid ${COLORS.pinkMediumLight}`,
  borderRadius: '8px',
  backgroundColor: COLORS.pinkVeryLight,
};

const fileInputStyle = {
  padding: '8px 0',
  border: 'none',
  backgroundColor: 'transparent',
  width: '100%',
  color: COLORS.textDark,
};

const imagePreviewStyle = {
  marginTop: '15px',
  maxWidth: '150px',
  maxHeight: '150px',
  borderRadius: '8px',
  objectFit: 'cover',
  border: `1px solid ${COLORS.pinkMediumLight}`,
};

const currentImageNoteStyle = {
  marginTop: '10px',
  fontSize: '0.9rem',
  color: COLORS.textDark,
};

const modalSubmitButtonStyle = {
  backgroundColor: COLORS.pinkDark,
  color: COLORS.textLight,
  padding: '12px 25px',
  borderRadius: '10px',
  fontSize: '1rem',
  fontWeight: 'bold',
  marginTop: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.3s ease',
};

const modalSubmitButtonStyleHover = {
  backgroundColor: COLORS.pinkMediumDark,
  transform: 'translateY(-2px)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
};

export default CategoriesPage;





























