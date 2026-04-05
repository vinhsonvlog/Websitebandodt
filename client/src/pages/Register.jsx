import { useRef, useState } from 'react';

import { register } from '../services/authService';
import {
	validateConfirmPassword,
	validateEmail,
	validatePassword,
} from '../utils/authValidation';

function Register({ onSwitchToLogin, onAuthSuccess }) {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmPasswordRef = useRef(null);

	const [form, setForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [formMessage, setFormMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: '' }));
		setFormMessage('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const nextErrors = {
			email: validateEmail(form.email),
			password: validatePassword(form.password),
			confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
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

		if (nextErrors.confirmPassword) {
			confirmPasswordRef.current?.focus();
			return;
		}

		try {
			setIsSubmitting(true);
			setFormMessage('');

			const response = await register({
				email: form.email.trim(),
				password: form.password,
				confirmPassword: form.confirmPassword,
			});

			onAuthSuccess(response.data);
		} catch (error) {
			setFormMessage(error.message || 'Đăng ký thất bại');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="auth-card-wrap" aria-label="register form">
			<form className="auth-card" onSubmit={handleSubmit} noValidate>
				<h2>Register</h2>

				<label htmlFor="register-email">Email</label>
				<input
					ref={emailRef}
					id="register-email"
					name="email"
					type="email"
					value={form.email}
					onChange={handleChange}
					placeholder="Enter your email"
					aria-invalid={Boolean(errors.email)}
				/>
				{errors.email ? <p className="form-error">{errors.email}</p> : null}

				<label htmlFor="register-password">Password</label>
				<input
					ref={passwordRef}
					id="register-password"
					name="password"
					type="password"
					value={form.password}
					onChange={handleChange}
					placeholder="Enter your password"
					aria-invalid={Boolean(errors.password)}
				/>
				{errors.password ? <p className="form-error">{errors.password}</p> : null}

				<label htmlFor="register-confirm">Re-enter your password to confirm</label>
				<input
					ref={confirmPasswordRef}
					id="register-confirm"
					name="confirmPassword"
					type="password"
					value={form.confirmPassword}
					onChange={handleChange}
					placeholder="Enter your password"
					aria-invalid={Boolean(errors.confirmPassword)}
				/>
				{errors.confirmPassword ? <p className="form-error">{errors.confirmPassword}</p> : null}

				{formMessage ? <p className="form-error form-error-global">{formMessage}</p> : null}

				<button type="submit" className="auth-submit" disabled={isSubmitting}>
					{isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}
				</button>

				<p className="auth-switch">
					Bạn đã có tài khoản?
					<button type="button" onClick={onSwitchToLogin}>
						Đăng nhập ngay
					</button>
				</p>
			</form>
		</section>
	);
}

export default Register;
