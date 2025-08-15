import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  X,
  Upload,
  Save,
  AlertCircle,
  Image as ImageIcon,
  Star,
  Grid,
  List,
  MoreVertical
} from 'lucide-react';

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    product_category_id: ''
  });

  // Dummy data based on your API structure
  const dummyProducts = [
    {
      "product_id": 6,
      "name": "Smartphone",
      "description": "This is new Smartphone Items",
      "price": "100.00",
      "product_category_id": 2,
      "product_images": [
        {
          "p_img_id": 4,
          "p_image_url": "https://res.cloudinary.com/do7kimovl/image/upload/v1754513021/product_images/skg835cky22pn5nmpozz.jpg",
          "p_created_at": "2025-08-07 02:13:42.000000"
        },
        {
          "p_img_id": 3,
          "p_image_url": "https://res.cloudinary.com/do7kimovl/image/upload/v1754513019/product_images/alldyeawtl1dax9tzsyn.png",
          "p_created_at": "2025-08-07 02:13:40.000000"
        }
      ],
      "category_details": {
        "name": "Electronic",
        "cat_image": "https://res.cloudinary.com/do7kimovl/image/upload/v1754512027/product_categories/gjkybvgbtkfbnzgv0oaj.png",
        "description": "This is new Electronic Items",
        "product_category_id": 2
      }
    },
    {
      "product_id": 7,
      "name": "Laptop Gaming",
      "description": "High performance gaming laptop with RTX graphics",
      "price": "85000.00",
      "product_category_id": 2,
      "product_images": [
        {
          "p_img_id": 5,
          "p_image_url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400",
          "p_created_at": "2025-08-07 03:15:20.000000"
        }
      ],
      "category_details": {
        "name": "Electronic",
        "cat_image": "https://res.cloudinary.com/do7kimovl/image/upload/v1754512027/product_categories/gjkybvgbtkfbnzgv0oaj.png",
        "description": "This is new Electronic Items",
        "product_category_id": 2
      }
    },
    {
      "product_id": 8,
      "name": "Wireless Headphones",
      "description": "Premium noise-cancelling wireless headphones",
      "price": "15000.00",
      "product_category_id": 2,
      "product_images": [
        {
          "p_img_id": 6,
          "p_image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
          "p_created_at": "2025-08-07 04:20:15.000000"
        }
      ],
      "category_details": {
        "name": "Electronic",
        "cat_image": "https://res.cloudinary.com/do7kimovl/image/upload/v1754512027/product_categories/gjkybvgbtkfbnzgv0oaj.png",
        "description": "This is new Electronic Items",
        "product_category_id": 2
      }
    },
    {
      "product_id": 9,
      "name": "Smart Watch",
      "description": "Fitness tracking smartwatch with heart rate monitor",
      "price": "25000.00",
      "product_category_id": 3,
      "product_images": [
        {
          "p_img_id": 7,
          "p_image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
          "p_created_at": "2025-08-07 05:10:30.000000"
        }
      ],
      "category_details": {
        "name": "Accessories",
        "cat_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
        "description": "Fashion and tech accessories",
        "product_category_id": 3
      }
    }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // API call simulation - replace with actual API call
      // const response = await fetch('/api/products');
      // const data = await response.json();
      // setProducts(data.data);
      
      // Using dummy data for now
      setTimeout(() => {
        setProducts(dummyProducts);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      // API call for adding product
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      console.log('Adding product:', formData);
      setShowAddModal(false);
      setFormData({ name: '', description: '', price: '', product_category_id: '' });
      loadProducts(); // Reload products
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async () => {
    try {
      // API call for updating product
      // const response = await fetch(`/api/products/${selectedProduct.product_id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      console.log('Updating product:', selectedProduct.product_id, formData);
      setShowEditModal(false);
      setSelectedProduct(null);
      setFormData({ name: '', description: '', price: '', product_category_id: '' });
      loadProducts(); // Reload products
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // API call for deleting product
        // const response = await fetch(`/api/products/${productId}`, {
        //   method: 'DELETE'
        // });
        
        console.log('Deleting product:', productId);
        loadProducts(); // Reload products
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      product_category_id: product.product_category_id
    });
    setShowEditModal(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(parseFloat(price));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category_details.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Product Images */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.product_images && product.product_images.length > 0 ? (
          <img 
            src={product.product_images[0].p_image_url} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon size={48} className="text-gray-400" />
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">{product.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
        </div>
        
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100">
            <img 
              src={product.category_details.cat_image} 
              alt={product.category_details.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-blue-600 font-medium">{product.category_details.name}</span>
        </div>
        
        {/* Price */}
        <div className="mb-3">
          <span className="text-lg font-bold text-green-600">{formatPrice(product.price)}</span>
        </div>
        
        {/* Images Count */}
        <div className="flex items-center gap-2 mb-3">
          <ImageIcon size={12} className="text-gray-400" />
          <span className="text-xs text-gray-500">{product.product_images?.length || 0} images</span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button 
            onClick={() => openEditModal(product)}
            className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
          >
            <Edit size={12} />
            Edit
          </button>
          <button 
            onClick={() => handleDeleteProduct(product.product_id)}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductRow = ({ product }) => (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
            {product.product_images && product.product_images.length > 0 ? (
              <img 
                src={product.product_images[0].p_image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon size={20} className="text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-800">{product.name}</div>
            <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <img 
            src={product.category_details.cat_image} 
            alt={product.category_details.name}
            className="w-6 h-6 rounded object-cover"
          />
          <span className="text-sm text-blue-600 font-medium">{product.category_details.name}</span>
        </div>
      </td>
      <td className="py-3 px-4 font-semibold text-green-600">{formatPrice(product.price)}</td>
      <td className="py-3 px-4 text-center text-sm text-gray-600">{product.product_images?.length || 0}</td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button 
            onClick={() => openEditModal(product)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <Edit size={12} />
            Edit
          </button>
          <button 
            onClick={() => handleDeleteProduct(product.product_id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors flex items-center gap-1"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} transition-colors`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} transition-colors`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className="bg-white rounded-lg shadow-sm border">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first product</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Price</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Images</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <ProductRow key={product.product_id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product">
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Enter product description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter price"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
            <input
              type="number"
              value={formData.product_category_id}
              onChange={(e) => setFormData({...formData, product_category_id: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category ID"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleAddProduct}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Add Product
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Product">
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
            <input
              type="number"
              value={formData.product_category_id}
              onChange={(e) => setFormData({...formData, product_category_id: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleEditProduct}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Update Product
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsTab;