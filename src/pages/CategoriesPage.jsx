// src/pages/CategoriesPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getAllCategories, createCategory, updateCategory, deleteCategory, getProductsByCategory } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react'; // Icons
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
            <div key={category._id} style={categoryCardStyle} className="card">
              <img
                src={getImageUrl(category.image)}
                alt={category.name}
                style={categoryImageStyle}
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/FFACD8/FF0099?text=No+Image" }}
              />
              <h3 style={categoryNameStyle}>{category.name}</h3>
              <div style={categoryActionsStyle}>
                <button
                  onClick={() => handleViewProducts(category._id)}
                  style={actionButtonStyle}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('view'))}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
                  title="View Products"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleOpenModal(category)}
                  style={actionButtonStyle}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, actionButtonStyleHover('edit'))}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, actionButtonStyle)}
                  title="Edit Category"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
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
};

const addCategoryButtonStyleHover = {
  backgroundColor: COLORS.pinkDark,
  transform: 'translateY(-3px)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
};

const categoryGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '25px',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 20px',
};

const categoryCardStyle = {
  backgroundColor: COLORS.pinkVeryLight,
  borderRadius: '50%', /* Make it circular */
  width: '180px', /* Fixed width for circular shape */
  height: '180px', /* Fixed height for circular shape */
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden', /* Hide overflowing image parts */
  padding: '15px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  border: `2px solid ${COLORS.pinkLight}`,
  position: 'relative', /* For actions overlay or positioning */
  transition: 'all 0.3s ease',
  margin: 'auto', /* Center cards in grid cells */
  flexShrink: 0, /* Prevent shrinking if content is too large */
};

const categoryCardStyleHover = {
  transform: 'scale(1.05)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
};

categoryCardStyle.onmouseover = (e) => Object.assign(e.currentTarget.style, categoryCardStyleHover);
categoryCardStyle.onmouseout = (e) => Object.assign(e.currentTarget.style, categoryCardStyle);


const categoryImageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%', /* Keep image circular inside circle card */
  objectFit: 'cover',
  marginBottom: '10px',
  border: `2px solid ${COLORS.pinkMediumLight}`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const categoryNameStyle = {
  color: COLORS.pinkDark,
  fontSize: '1.2rem',
  fontWeight: '600',
  textAlign: 'center',
  wordBreak: 'break-word', /* Handle long names */
  lineHeight: '1.3',
  maxHeight: '2.6em', /* Limit to two lines */
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const categoryActionsStyle = {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', /* Semi-transparent background for buttons */
  borderRadius: '8px',
  padding: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const actionButtonStyle = {
  backgroundColor: COLORS.pinkLight,
  color: COLORS.pinkDark,
  padding: '6px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const actionButtonStyleHover = (type) => {
  let bgColor;
  if (type === 'view') bgColor = COLORS.pinkMediumDark;
  else if (type === 'edit') bgColor = COLORS.pinkMediumDark;
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
};

const modalSubmitButtonStyleHover = {
  backgroundColor: COLORS.pinkMediumDark,
  transform: 'translateY(-2px)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
};

export default CategoriesPage;