import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../services/authService";
import { validateEmail } from "../utils/authValidation";

function ForgotPassword() {
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    setError(emailError);

    if (emailError) {
      emailRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await forgotPassword({ email: email.trim() });
      navigate("/verify-otp", {
        state: {
          email: email.trim(),
          resetCode: response?.data?.resetCode || "",
        },
      });
    } catch (requestError) {
      setError(
        requestError.message || "Không thể gửi email khôi phục mật khẩu",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-card-wrap" aria-label="forgot password form">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h2>Forgot Password</h2>

        <label htmlFor="forgot-email">Email</label>
        <input
          ref={emailRef}
          id="forgot-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder="Enter your email"
          aria-invalid={Boolean(error)}
        />
        {error ? <p className="form-error">{error}</p> : null}

        <div className="auth-actions-row">
          <button
            type="button"
            className="auth-secondary-btn"
            onClick={() => navigate("/login")}
          >
            CANCEL
          </button>
          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "SENDING..." : "SEND EMAIL"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgotPassword;
