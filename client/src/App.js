import { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductDetailPage/ProductDetailPage';
import ProductReviewPage from './pages/ProductReviewPage/ProductReviewPage';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

import ProfileLayout from './components/ProfileLayout/ProfileLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MyOrdersPage from './pages/MyOrdersPage/MyOrdersPage';
import ChatSupportPage from './pages/ChatSupportPage/ChatSupportPage';

import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from './utils/authStorage';

function App() {
  const [session, setSession] = useState(() => loadAuthSession() || { token: 'mock-token', user: { email: 'demo@user.com' } });

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

            {/* PROFILE UI */}
            <Route
              path="/profile"
              element={
                session ? <ProfileLayout /> : <Login onAuthSuccess={handleAuthSuccess} />
              }
            >
              <Route index element={<ProfilePage />} />
              <Route path="orders" element={<MyOrdersPage />} />
              <Route path="vouchers" element={<div>Voucher Page (Mock)</div>} />
            </Route>

            {/* CHAT SUPPORT UI */}
            <Route path="/support" element={<ChatSupportPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;