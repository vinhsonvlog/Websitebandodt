import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import './Admin.css';

const UserDashboard = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main-content">
                <div className="admin-card">
                    <h3>Quản lý Người dùng</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên hiển thị</th>
                                <th>Email</th>
                                <th>Phân quyền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#U001</td>
                                <td>Nguyễn Văn A</td>
                                <td>nva@gmail.com</td>
                                <td><span className="badge active">Khách hàng</span></td>
                                <td>
                                    <button className="btn-edit">Sửa</button>
                                    <button className="btn-delete">Khóa</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#U002</td>
                                <td>Trần Thị B</td>
                                <td>ttb_admin@gmail.com</td>
                                <td><span className="badge inactive">Quản trị viên</span></td>
                                <td>
                                    <button className="btn-edit">Sửa</button>
                                    <button className="btn-delete">Khóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;