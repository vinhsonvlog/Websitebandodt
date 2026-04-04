import { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductDetailPage/ProductDetailPage';
import ProductReviewPage from './pages/ProductReviewPage/ProductReviewPage';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/Admin/UserDashboard';
import AddProduct from './pages/Admin/AddProduct';
import ProductDashboard from './pages/Admin/ProductDashboard';

import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from './utils/authStorage';

function App() {
  const [session, setSession] = useState(() => loadAuthSession());

  const headline = useMemo(() => {
    if (!session?.user?.email) {
      return 'E-Store';
    }
    return `Hi, ${session.user.email}`;
  }, [session]);

  const handleAuthSuccess = ({ token, user }) => {
    const nextSession = { token, user };
    saveAuthSession(nextSession);
    setSession(nextSession);
  };

  const handleLogout = () => {
    clearAuthSession();
    setSession(null);
  };

  return (
    <Router>
      <div className="auth-scene">
        <main className="auth-content">
          <h1 className="brand-title">{headline}</h1>

          <Routes>
            {/* PUBLIC ROUTES */}
            <Route
              path="/login"
              element={<Login onAuthSuccess={handleAuthSuccess} />}
            />
            <Route
              path="/register"
              element={<Register onAuthSuccess={handleAuthSuccess} />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            {/* PRIVATE / MAIN */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/reviews" element={<ProductReviewPage />} />
            
            {/* ADMIN ROUTES - ĐÃ SỬA LỖI TẠI ĐÂY */}
            {/* Khi vào /admin hoặc /admin/products thì hiện danh sách */}
            <Route path="/admin" element={<ProductDashboard />} />
            <Route path="/admin/products" element={<ProductDashboard />} />
            
            {/* Khi bấm nút thêm mới, đường dẫn là /admin/products/add */}
            <Route path="/admin/products/add" element={<AddProduct />} />
            
            {/* Quản lý người dùng */}
            <Route path="/admin/users" element={<UserDashboard />} />


            {/* OPTIONAL: LOGOUT UI */}
            <Route
              path="/profile"
              element={
                session ? (
                  <div className="auth-card user-panel">
                    <h2>Success</h2>
                    <p>You are authenticated</p>
                    <p>Email: {session.user.email}</p>
                    <button onClick={handleLogout}>ĐĂNG XUẤT</button>
                  </div>
                ) : (
                  <Login onAuthSuccess={handleAuthSuccess} />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;