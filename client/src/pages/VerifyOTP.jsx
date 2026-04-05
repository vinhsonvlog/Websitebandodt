import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const expectedCode = location.state?.resetCode || "";

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const otpRefs = useRef([]);

  const otpValue = useMemo(() => otpDigits.join(""), [otpDigits]);

  const handleChange = (index, value) => {
    const sanitized = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = sanitized;
    setOtpDigits(nextDigits);
    setError("");

    if (sanitized && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (event) => {
    event.preventDefault();

    if (!email) {
      setError("Thiếu email xác thực. Vui lòng gửi lại email khôi phục.");
      return;
    }

    if (otpValue.length !== 6) {
      setError("Vui lòng nhập đủ 6 số OTP.");
      return;
    }

    if (expectedCode && otpValue !== expectedCode) {
      setError("OTP không hợp lệ, vui lòng kiểm tra lại.");
      return;
    }

    navigate("/reset-password", {
      state: {
        email,
        resetCode: otpValue,
      },
    });
  };

  return (
    <section className="auth-card-wrap" aria-label="verify otp form">
      <form className="auth-card" onSubmit={handleVerify} noValidate>
        <h2>Verify - OTP</h2>
        <p className="auth-note">
          Please enter the OTP sent to your registered email to complete
          verification.
        </p>

        <div className="otp-input-group">
          {otpDigits.map((digit, index) => (
            <input
              key={`otp-${index}`}
              ref={(node) => {
                otpRefs.current[index] = node;
              }}
              className="otp-input"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {error ? <p className="form-error form-error-global">{error}</p> : null}

        <button type="submit" className="auth-submit">
          VERIFY OTP
        </button>

        <p className="auth-switch">
          Sai email?
          <button type="button" onClick={() => navigate("/forgot-password")}>
            Gửi lại
          </button>
        </p>
      </form>
    </section>
  );
}

export default VerifyOTP;
