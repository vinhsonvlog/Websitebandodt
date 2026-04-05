import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AddProduct from './AddProduct';
import './Admin.css'; // Import file CSS giao diện

const AdminDashboard = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main-content">
                <AddProduct />
            </main>
        </div>
    );
};

export default AdminDashboard;