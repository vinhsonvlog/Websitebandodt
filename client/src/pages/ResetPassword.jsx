import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/authService";
import {
  validateConfirmPassword,
  validatePassword,
} from "../utils/authValidation";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const resetCode = location.state?.resetCode || "";

  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [requestError, setRequestError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setRequestError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !resetCode) {
      setRequestError(
        "Thiếu thông tin xác thực. Vui lòng thực hiện lại từ bước quên mật khẩu.",
      );
      return;
    }

    const nextErrors = {
      newPassword: validatePassword(form.newPassword),
      confirmPassword: validateConfirmPassword(
        form.newPassword,
        form.confirmPassword,
      ),
    };

    setErrors(nextErrors);

    if (nextErrors.newPassword) {
      passwordRef.current?.focus();
      return;
    }

    if (nextErrors.confirmPassword) {
      confirmRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);
      setRequestError("");

      const response = await resetPassword({
        email,
        resetCode,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      setMessage(
        response.message ||
          "Đặt lại mật khẩu thành công. Đang quay về đăng nhập...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (error) {
      setRequestError(error.message || "Không thể đặt lại mật khẩu");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-card-wrap" aria-label="reset password form">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h2>Reset Password</h2>

        <label htmlFor="reset-new-password">New Password</label>
        <input
          ref={passwordRef}
          id="reset-new-password"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="New Password (min. 6 characters)"
          aria-invalid={Boolean(errors.newPassword)}
        />
        {errors.newPassword ? (
          <p className="form-error">{errors.newPassword}</p>
        ) : null}

        <label htmlFor="reset-confirm-password">Confirm Password</label>
        <input
          ref={confirmRef}
          id="reset-confirm-password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          aria-invalid={Boolean(errors.confirmPassword)}
        />
        {errors.confirmPassword ? (
          <p className="form-error">{errors.confirmPassword}</p>
        ) : null}

        {requestError ? (
          <p className="form-error form-error-global">{requestError}</p>
        ) : null}
        {message ? (
          <p className="form-success form-error-global">{message}</p>
        ) : null}

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
        </button>
      </form>
    </section>
  );
}

export default ResetPassword;
