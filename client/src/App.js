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
import ComparisonPage from "./pages/ComparisonPage/ComparisonPage";
import ProductReviewPage from "./pages/ProductReviewPage/ProductReviewPage";

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

import { loadAuthSession, saveAuthSession } from "./utils/authStorage";

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

  const headline = useMemo(() => {
    if (!session?.user?.email) {
      return "E-Store";
    }
    return `Hi, ${session.user.email}`;
  }, [session]);

  const routes = (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login onAuthSuccess={onAuthSuccess} />} />
      <Route
        path="/register"
        element={<Register onAuthSuccess={onAuthSuccess} />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* PRIVATE / MAIN */}
      <Route path="/" element={<HomePage session={session} />} />
      <Route path="/products" element={<ProductPage session={session} />} />
      <Route
        path="/comparison"
        element={<ComparisonPage session={session} />}
      />
      <Route path="/reviews" element={<ProductReviewPage />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<ProductDashboard />} />
      <Route path="/admin/products" element={<ProductDashboard />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/users" element={<UserDashboard />} />

      {/* PROFILE UI */}
      <Route
        path="/profile"
        element={
          session ? <ProfileLayout /> : <Login onAuthSuccess={onAuthSuccess} />
        }
      >
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

  if (!isAuthRoute) {
    return routes;
  }

  return (
    <div className="auth-scene">
      <main className="auth-content">
        <h1 className="brand-title">{headline}</h1>
        {routes}
      </main>
    </div>
  );
}

function App() {
  const [session, setSession] = useState(() => loadAuthSession());

  const handleAuthSuccess = ({ token, user }) => {
    const nextSession = { token, user };
    saveAuthSession(nextSession);
    setSession(nextSession);
  };

  return (
    <Router>
      <AppRoutes session={session} onAuthSuccess={handleAuthSuccess} />
    </Router>
  );
}

export default App;
