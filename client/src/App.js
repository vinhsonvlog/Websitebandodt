import { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import ComparisonPage from './pages/ComparisonPage/ComparisonPage';
import ProductReviewPage from './pages/ProductReviewPage/ProductReviewPage';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

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
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/reviews" element={<ProductReviewPage />} />

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