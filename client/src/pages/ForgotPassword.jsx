import { useRef, useState } from 'react';

import { forgotPassword, resetPassword } from '../services/authService';
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from '../utils/authValidation';

function validateResetCode(resetCode) {
  const normalized = String(resetCode || '').trim();

  if (!normalized) {
    return 'Reset code is required';
  }

  if (!/^\d{6}$/.test(normalized)) {
    return 'Reset code must contain 6 digits';
  }

  return '';
}

function ForgotPassword({ onBackToLogin }) {
  const emailRef = useRef(null);
  const codeRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [requestError, setRequestError] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [devResetCode, setDevResetCode] = useState('');
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);

  const [resetForm, setResetForm] = useState({
    resetCode: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resetErrors, setResetErrors] = useState({
    resetCode: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [isResetSubmitting, setIsResetSubmitting] = useState(false);

  const handleSubmitRequest = async (event) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    setRequestError(emailError);
    setRequestMessage('');
    setResetError('');

    if (emailError) {
      emailRef.current?.focus();
      return;
    }

    try {
      setIsRequestSubmitting(true);
      const response = await forgotPassword({ email: email.trim() });
      setRequestMessage(response.message || 'Reset code sent successfully');
      setDevResetCode(response?.data?.resetCode || '');
      setStep('reset');
    } catch (error) {
      setRequestError(error.message || 'Không thể gửi mã đặt lại mật khẩu');
    } finally {
      setIsRequestSubmitting(false);
    }
  };

  const handleResetFieldChange = (event) => {
    const { name, value } = event.target;

    setResetForm((prev) => ({ ...prev, [name]: value }));
    setResetErrors((prev) => ({ ...prev, [name]: '' }));
    setResetError('');
    setResetMessage('');
  };

  const handleSubmitReset = async (event) => {
    event.preventDefault();

    const nextErrors = {
      resetCode: validateResetCode(resetForm.resetCode),
      newPassword: validatePassword(resetForm.newPassword),
      confirmPassword: validateConfirmPassword(resetForm.newPassword, resetForm.confirmPassword),
    };

    setResetErrors(nextErrors);
    setResetError('');
    setResetMessage('');

    if (nextErrors.resetCode) {
      codeRef.current?.focus();
      return;
    }

    if (nextErrors.newPassword) {
      newPasswordRef.current?.focus();
      return;
    }

    if (nextErrors.confirmPassword) {
      confirmPasswordRef.current?.focus();
      return;
    }

    try {
      setIsResetSubmitting(true);
      const response = await resetPassword({
        email: email.trim(),
        resetCode: resetForm.resetCode.trim(),
        newPassword: resetForm.newPassword,
        confirmPassword: resetForm.confirmPassword,
      });

      setResetMessage(response.message || 'Password reset successful');
      setResetForm({ resetCode: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setResetError(error.message || 'Không thể đặt lại mật khẩu');
    } finally {
      setIsResetSubmitting(false);
    }
  };

  return (
    <section className="auth-card-wrap" aria-label="forgot password form">
      <div className="auth-card">
        <h2>Forgot</h2>
        <p className="auth-welcome">Khôi phục mật khẩu</p>

        {step === 'request' ? (
          <form onSubmit={handleSubmitRequest} noValidate>
            <label htmlFor="forgot-email">Email</label>
            <input
              ref={emailRef}
              id="forgot-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setRequestError('');
                setRequestMessage('');
              }}
              placeholder="Enter your account email"
              aria-invalid={Boolean(requestError)}
            />
            {requestError ? <p className="form-error">{requestError}</p> : null}
            {requestMessage ? <p className="form-success">{requestMessage}</p> : null}

            <button type="submit" className="auth-submit" disabled={isRequestSubmitting}>
              {isRequestSubmitting ? 'ĐANG GỬI MÃ...' : 'GỬI MÃ XÁC NHẬN'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitReset} noValidate>
            <p className="auth-note">Mã xác nhận đã được gửi tới: {email}</p>
            {devResetCode ? (
              <p className="auth-note">Mã test (dev): {devResetCode}</p>
            ) : null}

            <label htmlFor="reset-code">Reset code</label>
            <input
              ref={codeRef}
              id="reset-code"
              name="resetCode"
              type="text"
              value={resetForm.resetCode}
              onChange={handleResetFieldChange}
              placeholder="Enter 6-digit code"
              aria-invalid={Boolean(resetErrors.resetCode)}
            />
            {resetErrors.resetCode ? <p className="form-error">{resetErrors.resetCode}</p> : null}

            <label htmlFor="reset-new-password">New password</label>
            <input
              ref={newPasswordRef}
              id="reset-new-password"
              name="newPassword"
              type="password"
              value={resetForm.newPassword}
              onChange={handleResetFieldChange}
              placeholder="Enter new password"
              aria-invalid={Boolean(resetErrors.newPassword)}
            />
            {resetErrors.newPassword ? <p className="form-error">{resetErrors.newPassword}</p> : null}

            <label htmlFor="reset-confirm-password">Confirm new password</label>
            <input
              ref={confirmPasswordRef}
              id="reset-confirm-password"
              name="confirmPassword"
              type="password"
              value={resetForm.confirmPassword}
              onChange={handleResetFieldChange}
              placeholder="Confirm new password"
              aria-invalid={Boolean(resetErrors.confirmPassword)}
            />
            {resetErrors.confirmPassword ? <p className="form-error">{resetErrors.confirmPassword}</p> : null}

            {resetError ? <p className="form-error form-error-global">{resetError}</p> : null}
            {resetMessage ? <p className="form-success form-error-global">{resetMessage}</p> : null}

            <button type="submit" className="auth-submit" disabled={isResetSubmitting}>
              {isResetSubmitting ? 'ĐANG CẬP NHẬT...' : 'ĐẶT LẠI MẬT KHẨU'}
            </button>
          </form>
        )}

        <p className="auth-switch">
          Quay lại đăng nhập?
          <button type="button" onClick={onBackToLogin}>
            Đăng nhập ngay
          </button>
        </p>
      </div>
    </section>
  );
}

export default ForgotPassword;
