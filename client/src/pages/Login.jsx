import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";
import { validateEmail, validatePassword } from "../utils/authValidation";

function Login({ onAuthSuccess }) {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };

    setErrors(nextErrors);

    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }

    if (nextErrors.password) {
      passwordRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);
      setFormMessage("");

      const response = await login({
        email: form.email.trim(),
        password: form.password,
      });

      onAuthSuccess(response.data);
      navigate("/", { replace: true });
    } catch (error) {
      setFormMessage(error.message || "Đăng nhập thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-card-wrap" aria-label="login form">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>
        <p className="auth-welcome">Welcome to E-Store</p>

        <label htmlFor="login-email">Email</label>
        <input
          ref={emailRef}
          id="login-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <p className="form-error">{errors.email}</p> : null}

        <label htmlFor="login-password">Password</label>
        <input
          ref={passwordRef}
          id="login-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password ? (
          <p className="form-error">{errors.password}</p>
        ) : null}

        <p className="auth-helper">
          <button
            type="button"
            className="auth-inline-action"
            onClick={() => navigate("/forgot-password")}
          >
            Quên mật khẩu?
          </button>
        </p>

        {formMessage ? (
          <p className="form-error form-error-global">{formMessage}</p>
        ) : null}

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
        </button>

        <p className="auth-switch">
          Chưa có tài khoản?
          <button type="button" onClick={() => navigate("/register")}>
            Đăng ký ngay
          </button>
        </p>
      </form>
    </section>
  );
}

export default Login;
