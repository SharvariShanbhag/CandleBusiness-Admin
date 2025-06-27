import React, { useState, useEffect, useCallback } from 'react';
import {
  getAllProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByQuery,
  getAllCategories // <--- This import fix is still here
} from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { PlusCircle, Edit, Trash2, Eye, Search } from 'lucide-react';
import { COLORS } from '../utils/constants'; // Make sure this is linked to the pink palette below
import { getImageUrl } from '../utils/helpers';
import toast from 'react-hot-toast';

// Product Form Component (for Create/Edit Product Modal)
const ProductForm = ({ currentProduct, onClose, onSave, categories }) => {
  const [name, setName] = useState(currentProduct?.name || '');
  const [description, setDescription] = useState(currentProduct?.description || '');
  const [price, setPrice] = useState(currentProduct?.price || '');
  const [category, setCategory] = useState(currentProduct?.category?._id || currentProduct?.category || '');
  const [quantity, setQuantity] = useState(currentProduct?.stock || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentProduct?.image ? getImageUrl(currentProduct.image) : null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(currentProduct?.image ? getImageUrl(currentProduct.image) : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !quantity) {
      toast.error('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('quantity', quantity);

    if (image) {
      formData.append('image', image);
    }

    await onSave(currentProduct?._id, formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={productFormStyle}>
      <div style={productFormGroupStyle}>
        <label style={productFormLabelStyle}>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={productFormInputStyle} />
      </div>
      <div style={productFormGroupStyle}>
        <label style={productFormLabelStyle}>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={productFormInputStyle} />
      </div>
      <div style={productFormGroupStyle}>
        <label style={productFormLabelStyle}>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" style={productFormInputStyle} />
      </div>
      <div style={productFormGroupStyle}>
        <label style={productFormLabelStyle}>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required style={productFormInputStyle}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div style={productFormGroupStyle}>
        <label style={productFormLabelStyle}>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min="0" style={productFormInputStyle} />
      </div>
      <div style={productFormGroupStyle}>
        <label style={productFormLabelStyle}>Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} style={productFormFileInputStyle} />
        {imagePreview && (
          <img src={imagePreview} alt="Image Preview" style={productFormImagePreviewStyle} />
        )}
        {currentProduct && !image && currentProduct.image && (
            <p style={currentImageNoteStyle}>Current image will be used if no new image selected.</p>
        )}
      </div>
      <button
        type="submit"
        style={productFormSubmitButtonStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, productFormSubmitButtonStyleHover)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, productFormSubmitButtonStyle)}
      >
        {currentProduct ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
};


const ProductsPage = ({ selectedCategoryId, setCurrentPage, setSelectedProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // For edit mode
  const [categories, setCategories] = useState([]); // For category dropdown in product form
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let response;
      if (selectedCategoryId) {
        response = await getProductsByCategory(selectedCategoryId);
      } else if (searchTerm) {
        response = await searchProductsByQuery(searchTerm);
      } else {
        response = await getAllProducts();
      }
      setProducts(response.data.products || response.data.productsFound || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again.');
      toast.error('Failed to load products.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategoryId, searchTerm]);

  const fetchCategoriesForForm = useCallback(async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories for form:', err);
      toast.error('Failed to load categories for product form.');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategoriesForForm();
  }, [fetchProducts, fetchCategoriesForForm]);

  const handleOpenModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSaveProduct = async (id, formData) => {
    try {
      if (id) {
        await updateProduct(id, formData);
        toast.success('Product updated successfully!');
      } else {
        await createProduct(formData);
        toast.success('Product created successfully!');
      }
      fetchProducts();
    } catch (err) {
      console.error('Product operation failed:', err);
      toast.error(err.response?.data?.message || 'Failed to save product.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully!');
        fetchProducts();
      } catch (err) {
        console.error('Failed to delete product:', err);
        toast.error(err.response?.data?.message || 'Failed to delete product.');
      }
    }
  };

  const handleSeeMore = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('productDetail');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div style={{ padding: '20px', color: COLORS.deleteColor, textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div style={productsPageStyle}>
      <h2 style={pageTitleStyle}>
        {selectedCategoryId ? 'Products in Category' : 'All Products'}
      </h2>

      <div style={controlsContainerStyle}>
        <button
          onClick={() => handleOpenModal()}
          style={addProductButtonStyle}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, addProductButtonStyleHover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, addProductButtonStyle)}
        >
          <PlusCircle size={20} /> Add New Product
        </button>
        <form onSubmit={handleSearch} style={searchFormStyle}>
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
          <button
            type="submit"
            style={searchButtonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, searchButtonStyleHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, searchButtonStyle)}
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      {products.length === 0 ? (
        <p style={{textAlign: 'center', marginTop: '30px', fontSize: '1.1rem', color: COLORS.textDark}}>No products found.</p>
      ) : (
        <div style={productGridStyle}>
          {products.map((product) => (
            <div key={product._id} style={productCardStyle} className="card">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                style={productImageStyle}
                // Fallback for image loading errors
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/FFACD8/FF0099?text=No+Image" }}
              />
              <h3 style={productNameStyle}>{product.name}</h3>
              <p style={productPriceStyle}>${product.price.toFixed(2)}</p>
              <p style={productStockStyle}>Stock: {product.stock}</p>
              <div style={productActionsStyle}>
                <button
                  onClick={() => handleSeeMore(product._id)}
                  style={productActionButtonStyle}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, productActionButtonStyleHover('view'))}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, productActionButtonStyle)}
                  title="See More"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleOpenModal(product)}
                  style={productActionButtonStyle}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, productActionButtonStyleHover('edit'))}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, productActionButtonStyle)}
                  title="Edit Product"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  style={productActionButtonStyle} // Default style
                  className="delete-btn" // Add this class for specific CSS targeting
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, productActionButtonStyleHover('delete'))}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, productActionButtonStyle)}
                  title="Delete Product"
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
        title={currentProduct ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm
          currentProduct={currentProduct}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          categories={categories}
        />
      </Modal>
    </div>
  );
};

// --- STYLES ---
// THESE STYLES ARE SET TO YOUR ORIGINAL PINK PALETTE
const productsPageStyle = {
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

const controlsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
  gap: '20px',
  flexWrap: 'wrap',
};

const addProductButtonStyle = {
  backgroundColor: COLORS.pinkMediumDark,
  color: COLORS.textLight,
  padding: '12px 25px',
  borderRadius: '10px',
  fontSize: '1rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  border: `1px solid ${COLORS.pinkMediumDark}`, // Added explicit border for consistency
};

const addProductButtonStyleHover = {
  backgroundColor: COLORS.pinkDark,
  transform: 'translateY(-3px)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  border: `1px solid ${COLORS.pinkDark}`, // Added explicit border for consistency
};

const searchFormStyle = {
  display: 'flex',
  gap: '10px',
  flexGrow: 1,
  maxWidth: '400px',
};

const searchInputStyle = {
  flexGrow: 1,
  padding: '10px 15px',
  border: `1px solid ${COLORS.pinkMediumLight}`,
  borderRadius: '8px',
  fontSize: '1rem',
  backgroundColor: COLORS.pinkVeryLight,
  color: COLORS.textDark,
};

const searchButtonStyle = {
  backgroundColor: COLORS.pinkDark,
  color: COLORS.textLight,
  padding: '10px 15px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${COLORS.pinkDark}`, // Added explicit border for consistency
};

const searchButtonStyleHover = {
  backgroundColor: COLORS.pinkMediumDark,
  transform: 'translateY(-2px)',
};


const productGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '25px',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 20px',
};

const productCardStyle = {
  backgroundColor: COLORS.pinkVeryLight,
  borderRadius: '15px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  padding: '20px',
  textAlign: 'center',
  border: `1px solid ${COLORS.pinkLight}`,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const productImageStyle = {
  width: '150px',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '15px',
  border: `2px solid ${COLORS.pinkMediumLight}`,
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
};

const productNameStyle = {
  color: COLORS.pinkDark,
  fontSize: '1.4rem',
  fontWeight: '700',
  marginBottom: '10px',
  minHeight: '2.8em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

const productPriceStyle = {
  fontSize: '1.2rem',
  color: COLORS.textDark,
  fontWeight: '600',
  marginBottom: '5px',
};

const productStockStyle = {
  fontSize: '0.9rem',
  color: COLORS.textDark,
  opacity: 0.8,
  marginBottom: '20px',
};

const productActionsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  width: '100%',
};

const productActionButtonStyle = {
  backgroundColor: COLORS.pinkLight,
  color: COLORS.pinkDark,
  padding: '8px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  flexGrow: 1,
  border: `1px solid ${COLORS.pinkLight}`, // Added explicit border for consistency
};

const productActionButtonStyleHover = (type) => {
  let bgColor;
  let textColor = COLORS.textLight; // Default to white text on hover
  let borderColor;

  if (type === 'view') {
      bgColor = COLORS.pinkMediumDark;
      borderColor = COLORS.pinkMediumDark;
  } else if (type === 'edit') {
      bgColor = COLORS.pinkMediumDark;
      borderColor = COLORS.pinkMediumDark;
  } else if (type === 'delete') {
      bgColor = '#dc3545'; // Red for delete
      borderColor = '#dc3545';
  }
  return {
    backgroundColor: bgColor,
    color: textColor,
    transform: 'scale(1.05)',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    borderColor: borderColor,
  };
};

// Styles for ProductForm (modal content)
const productFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const productFormGroupStyle = {
  marginBottom: '10px',
};

const productFormLabelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  color: COLORS.textDark,
};

const productFormInputStyle = {
  width: '100%',
  padding: '10px 15px',
  border: `1px solid ${COLORS.pinkMediumLight}`,
  borderRadius: '8px',
  backgroundColor: COLORS.pinkVeryLight,
  color: COLORS.textDark,
};

const productFormFileInputStyle = {
  padding: '8px 0',
  border: 'none',
  backgroundColor: 'transparent',
  width: '100%',
  color: COLORS.textDark,
};

const productFormImagePreviewStyle = {
  marginTop: '15px',
  maxWidth: '150px',
  maxHeight: '150px',
  borderRadius: '8px',
  objectFit: 'cover',
  border: `1px solid ${COLORS.pinkMediumLight}`,
};

const currentImageNoteStyle = {
    fontSize: '0.85rem',
    color: COLORS.textDark,
    opacity: 0.7,
    marginTop: '5px',
};

const productFormSubmitButtonStyle = {
  backgroundColor: COLORS.pinkDark,
  color: COLORS.textLight,
  padding: '12px 25px',
  borderRadius: '10px',
  fontSize: '1rem',
  fontWeight: 'bold',
  marginTop: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  border: `1px solid ${COLORS.pinkDark}`, // Added explicit border for consistency
};

const productFormSubmitButtonStyleHover = {
  backgroundColor: COLORS.pinkMediumDark,
  transform: 'translateY(-2px)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  border: `1px solid ${COLORS.pinkMediumDark}`, // Added explicit border for consistency
};

export default ProductsPage;