import React from 'react';

const Sidebar = () => {
    return (
        <aside className="admin-sidebar">
            <h2>ADMIN PAGE</h2>
            <ul>
            <li><a href="/admin/products" className="active">Quản lý Sản phẩm</a></li>
            <li><a href="/admin/users">Quản lý User</a></li>
            </ul>
        </aside>
    );
};

export default Sidebar;