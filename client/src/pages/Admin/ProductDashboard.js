import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import './Admin.css';

const ProductDashboard = () => {
    const navigate = useNavigate(); // Hook dùng để chuyển trang trong React

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main-content">
                <div className="admin-card">
                    {/* Phần Header chứa Tiêu đề và Nút Thêm */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0 }}>Danh sách Sản phẩm</h3>
                        <button 
                            className="btn-save" 
                            style={{ marginTop: 0 }} 
                            onClick={() => navigate('/admin/products/add')}
                        >
                            + Thêm sản phẩm
                        </button>
                    </div>

                    {/* Bảng danh sách sản phẩm */}
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Mã SP</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá bán</th>
                                <th>Tồn kho</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#SP001</td>
                                <td>iPhone 15 Pro Max 256GB</td>
                                <td>29.500.000đ</td>
                                <td>15</td>
                                <td><span className="badge active">Còn hàng</span></td>
                                <td>
                                    <button className="btn-edit">Sửa</button>
                                    <button className="btn-delete">Xóa</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#SP002</td>
                                <td>MacBook Air M2 8GB/256GB</td>
                                <td>24.990.000đ</td>
                                <td>0</td>
                                <td><span className="badge expired">Hết hàng</span></td>
                                <td>
                                    <button className="btn-edit">Sửa</button>
                                    <button className="btn-delete">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default ProductDashboard;