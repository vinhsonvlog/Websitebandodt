import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm công cụ chuyển trang
import Sidebar from '../../components/admin/Sidebar';

const AddProduct = () => {
    const navigate = useNavigate(); // Khởi tạo biến điều hướng

    const [imagePreview, setImagePreview] = useState(null);
    const [productData, setProductData] = useState({
        name: '', price: '', quantity: '', description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dữ liệu sản phẩm chuẩn bị gửi đi:", productData);
        alert(`Đã lưu thành công sản phẩm: ${productData.name}`);
        
        // NÂNG CẤP: Lưu thành công thì tự động quay về trang danh sách
        navigate('/admin/products'); 
    };

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main-content">
                <div className="admin-card">
                    <h3>Thêm Sản Phẩm Mới</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="product-form">
                            <div className="left-col">
                                <div className="form-group">
                                    <label>Tên Sản Phẩm:</label>
                                    <input type="text" name="name" value={productData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Giá bán:</label>
                                    <input type="number" name="price" value={productData.price} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Số lượng trong kho:</label>
                                    <input type="number" name="quantity" value={productData.quantity} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Mô tả sản phẩm:</label>
                                    <textarea name="description" value={productData.description} onChange={handleInputChange} rows="4"></textarea>
                                </div>
                            </div>

                            <div className="right-col">
                                <div className="image-upload-box" onClick={() => document.getElementById('imageInput').click()}>
                                    {!imagePreview && <span>Tải ảnh lên</span>}
                                    {imagePreview && <img src={imagePreview} alt="Preview" className="preview-img" />}
                                    <input type="file" id="imageInput" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
                                </div>
                            </div>
                        </div>
                        
                        {/* NÂNG CẤP: Bổ sung nút Hủy/Quay lại */}
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button 
                                type="button" 
                                className="btn-edit" 
                                onClick={() => navigate('/admin/products')}
                            >
                                Hủy (Quay lại)
                            </button>
                            <button type="submit" className="btn-save" style={{ margin: 0 }}>
                                Lưu sản phẩm
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddProduct;