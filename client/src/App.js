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

function AppRoutes({ session, onAuthSuccess, onLogout }) {
  const location = useLocation();
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);
  const requireAuth = (element) =>
    session ? (
      element
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );

  const headline = useMemo(() => {
    if (!session?.user?.email) {
      return "E-Store";
    }
    return `Hi, ${session.user.email}`;
  }, [session]);

  const routes = (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={
          session ? (
            <Navigate to="/" replace />
          ) : (
            <Login onAuthSuccess={onAuthSuccess} />
          )
        }
      />
      <Route
        path="/register"
        element={session ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* PRIVATE / MAIN */}
       <Route path="/" element={<HomePage />} />

      <Route
        path="/products"
        element={requireAuth(
          <ProductListPage session={session} onLogout={onLogout} />,
        )}
      />
      <Route
        path="/products/:id"
        element={requireAuth(
          <ProductDetailPage session={session} onLogout={onLogout} />,
        )}
      />
      <Route
        path="/product/:id"
        element={requireAuth(
          <ProductDetailPage session={session} onLogout={onLogout} />,
        )}
      />
      <Route
        path="/catalog"
        element={requireAuth(
          <ProductPage session={session} onLogout={onLogout} />,
        )}
      />
      <Route
        path="/comparison"
        element={requireAuth(
          <ComparisonPage session={session} onLogout={onLogout} />,
        )}
      />
      <Route path="/reviews" element={requireAuth(<ProductReviewPage />)} />
      <Route path="/cart" element={requireAuth(<CartPage />)} />
      <Route path="/checkout" element={requireAuth(<CheckoutPage />)} />
      <Route path="/orders" element={requireAuth(<MyOrdersPage />)} />

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={requireAuth(<ProductDashboard />)} />
      <Route
        path="/admin/products"
        element={requireAuth(<ProductDashboard />)}
      />
      <Route path="/admin/products/add" element={requireAuth(<AddProduct />)} />
      <Route path="/admin/users" element={requireAuth(<UserDashboard />)} />

      {/* PROFILE UI */}
      <Route path="/profile" element={requireAuth(<ProfileLayout />)}>
        <Route index element={<ProfilePage />} />
        <Route path="orders" element={<MyOrdersPage />} />
        <Route path="vouchers" element={<div>Voucher Page (Mock)</div>} />
      </Route>

      {/* CHAT SUPPORT UI */}
      <Route path="/support" element={requireAuth(<ChatSupportPage />)} />

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
