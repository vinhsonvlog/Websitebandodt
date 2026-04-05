import { useState, useEffect } from 'react';
import './ComparisonPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Helper function để lấy đường dẫn hình ảnh
const getProductImage = (productId) => {
  const imageMap = {
    1: '/images/products/iphone-xs-max.jpg',
    2: '/images/products/iphone-15-pro.jpg',
    3: '/images/products/samsung-s24.jpg',
  };
  return imageMap[productId] || '/images/products/placeholder.jpg';
};

const allProducts = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro',
    brand: 'Apple',
    price: '23.990.000đ',
    image: getProductImage(2),
    screen: '6.1 inch Super Retina',
    mainCamera: '48MP+12MP',
    frontCamera: '12MP',
    chip: 'A17 Pro',
    ram: '16GB',
    storage: '256GB',
    battery: '3582 mAh',
    features: 'iOS 17',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    price: '19.990.000đ',
    image: getProductImage(3),
    screen: '6.1 inch Super Amoled',
    mainCamera: '50MP+12MP',
    frontCamera: '12MP',
    chip: 'Snapdragon 8 Gen 3',
    ram: '12GB',
    storage: '256GB',
    battery: '4000 mAh',
    features: 'Android 14',
  },
  {
    id: 3,
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: '27.990.000đ',
    image: getProductImage(10),
    screen: '6.7 inch Amoled',
    mainCamera: '50MP+48MP',
    frontCamera: '10.5MP',
    chip: 'Google Tensor G3',
    ram: '12GB',
    storage: '256GB',
    battery: '5050 mAh',
    features: 'Android 14',
  },
  {
    id: 4,
    name: 'iPhone XS Max',
    brand: 'Apple',
    price: '15.990.000đ',
    image: getProductImage(1),
    screen: '6.5 inch Super Retina',
    mainCamera: '12MP+12MP',
    frontCamera: '7MP',
    chip: 'A12 Bionic',
    ram: '4GB',
    storage: '64GB',
    battery: '3174 mAh',
    features: 'iOS 16',
  },
];

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState(allProducts);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ids = params.get('ids')?.split(',').map(Number) || [];
    
    if (ids.length > 0) {
      const products = allProducts.filter((p) => ids.includes(p.id));
      setSelectedProducts(products);
    }
  }, [location.search]);

  const handleRemoveProduct = (productId) => {
    const updated = selectedProducts.filter((p) => p.id !== productId);
    setSelectedProducts(updated);
    
    if (updated.length === 0) {
      navigate('/products');
    } else {
      const ids = updated.map((p) => p.id).join(',');
      navigate(`/comparison?ids=${ids}`);
    }
  };

  const handleAddProduct = (product) => {
    if (selectedProducts.length < 4 && !selectedProducts.find((p) => p.id === product.id)) {
      const updated = [...selectedProducts, product];
      setSelectedProducts(updated);
      const ids = updated.map((p) => p.id).join(',');
      navigate(`/comparison?ids=${ids}`);
    }
  };

  const availableForSelection = allProducts.filter(
    (p) => !selectedProducts.find((sp) => sp.id === p.id)
  );

  return (
    <div className="comparison-page">
      <Header />
      
      <main className="comparison-container">
        {selectedProducts.length === 0 ? (
          <div className="empty-state">
            <h2>Chưa có sản phẩm để so sánh</h2>
            <p>Chọn ít nhất 2 sản phẩm để bắt đầu so sánh</p>
            <button onClick={() => navigate('/products')} className="btn-back">
              Quay lại danh mục
            </button>
          </div>
        ) : (
          <div className="comparison-content">
            <div className="comparison-header">
              <h1>So Sánh Sản Phẩm</h1>
              <p>{selectedProducts.length} sản phẩm được chọn</p>
            </div>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <tbody>
                  {/* PRODUCT SELECTION ROW */}
                  <tr className="product-row">
                    <td className="spec-label"></td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        <div className="product-header">
                          <button
                            className="btn-remove"
                            onClick={() => handleRemoveProduct(product.id)}
                            title="Xóa sản phẩm"
                          >
                            ✕
                          </button>
                          <img src={product.image} alt={product.name} className="product-img" />
                        </div>
                      </td>
                    ))}
                    {selectedProducts.length < 4 && (
                      <td className="add-product-cell">
                        <div className="add-product-dropdown">
                          <label>Thêm sản phẩm</label>
                          <select onChange={(e) => {
                            if (e.target.value) {
                              const product = allProducts.find((p) => p.id === Number(e.target.value));
                              if (product) handleAddProduct(product);
                              e.target.value = '';
                            }
                          }}>
                            <option value="">Chọn sản phẩm...</option>
                            {availableForSelection.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    )}
                  </tr>

                  {/* PRODUCT NAME ROW */}
                  <tr className="name-row">
                    <td className="spec-label">Tên sản phẩm</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        <strong>{product.name}</strong>
                      </td>
                    ))}
                  </tr>

                  {/* PRICE ROW */}
                  <tr className="spec-row highlight">
                    <td className="spec-label">Giá</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell price-cell">
                        <span className="price">{product.price}</span>
                      </td>
                    ))}
                  </tr>

                  {/* SCREEN ROW */}
                  <tr className="spec-row">
                    <td className="spec-label">Màn hình</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        {product.screen}
                      </td>
                    ))}
                  </tr>

                  {/* MAIN CAMERA ROW */}
                  <tr className="spec-row">
                    <td className="spec-label">Camera sau</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        {product.mainCamera}
                      </td>
                    ))}
                  </tr>

                  {/* FRONT CAMERA ROW */}
                  <tr className="spec-row">
                    <td className="spec-label">Camera trước</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        {product.frontCamera}
                      </td>
                    ))}
                  </tr>

                  {/* CHIP ROW */}
                  <tr className="spec-row">
                    <td className="spec-label">Chip</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        {product.chip}
                      </td>
                    ))}
                  </tr>

                  {/* RAM ROW */}
                  <tr className="spec-row">
                    <td className="spec-label">Ram</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        {product.ram}
                      </td>
                    ))}
                  </tr>

                  {/* STORAGE ROW */}
                  <tr className="spec-row">
                    <td className="spec-label">Bộ nhớ trong</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        {product.storage}
                      </td>
                    ))}
                  </tr>

                  {/* BATTERY ROW */}
                  <tr className="spec-row">
                    <td className="spec-label">Pin</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        {product.battery}
                      </td>
                    ))}
                  </tr>

                  {/* FEATURES ROW */}
                  <tr className="spec-row">
                    <td className="spec-label">Hệ điều hành</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        {product.features}
                      </td>
                    ))}
                  </tr>

                  {/* ACTION ROW */}
                  <tr className="action-row">
                    <td className="spec-label"></td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="product-cell">
                        <button className="btn-buy">Mua ngay</button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="comparison-actions">
              <button onClick={() => navigate('/products')} className="btn-back-full">
                ← Quay lại danh mục
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
