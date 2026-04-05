import { useMemo, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ComparisonPage from "./pages/ComparisonPage/ComparisonPage";
import ProductReviewPage from "./pages/ProductReviewPage/ProductReviewPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/Admin/UserDashboard";
import AddProduct from "./pages/Admin/AddProduct";
import ProductDashboard from "./pages/Admin/ProductDashboard";

import ProfileLayout from "./components/ProfileLayout/ProfileLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
import ChatSupportPage from "./pages/ChatSupportPage/ChatSupportPage";

import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from "./utils/authStorage";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

function AppRoutes({ session, onAuthSuccess }) {
  const location = useLocation();
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);

  // Memoize headline để tránh render lại không cần thiết
  const headline = useMemo(() => {
    return session?.user?.email ? `Hi, ${session.user.email} (Dev Mode)` : "E-Store";
  }, [session]);

  const routes = (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login onAuthSuccess={onAuthSuccess} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* MAIN CONTENT ROUTES */}
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/catalog" element={<ProductPage />} />
      <Route path="/comparison" element={<ComparisonPage />} />
      <Route path="/reviews" element={<ProductReviewPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<MyOrdersPage />} />

      {/* ADMIN ROUTES (Mở tự do để xem giao diện) */}
      <Route path="/admin" element={<ProductDashboard />} />
      <Route path="/admin/products" element={<ProductDashboard />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/users" element={<UserDashboard />} />

      {/* PROFILE UI */}
      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="orders" element={<MyOrdersPage />} />
        <Route path="vouchers" element={<div>Voucher Page (Mock)</div>} />
      </Route>

      {/* CHAT SUPPORT UI */}
      <Route path="/support" element={<ChatSupportPage />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  // Nếu là trang Login/Register thì bọc trong layout riêng, còn lại hiện routes bình thường
  if (isAuthRoute) {
    return (
      <div className="auth-scene">
        <main className="auth-content">
          <h1 className="brand-title">{headline}</h1>
          {routes}
        </main>
      </div>
    );
  }

  return routes;
}

function App() {
  // TỰ ĐỘNG GIẢ LẬP SESSION KHI SERVER LỖI
  const [session, setSession] = useState(() => {
    const saved = loadAuthSession();
    if (saved) return saved;
    
    // Nếu không có session thực, trả về session giả để vào được Admin/Profile
    return { 
      token: "mock-token-for-dev", 
      user: { email: "guest@dev.mode", role: "admin" } 
    };
  });

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
      <AppRoutes
        session={session}
        onAuthSuccess={handleAuthSuccess}
        onLogout={handleLogout}
      />
    </Router>
  );
}

export default App;
