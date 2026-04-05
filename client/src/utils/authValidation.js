const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  const normalized = String(email || '').trim();

  if (!normalized) {
    return 'Email is required';
  }

  if (!EMAIL_REGEX.test(normalized)) {
    return 'Email format is invalid';
  }

  return '';
}

function validatePassword(password) {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  return '';
}

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }

  if (password !== confirmPassword) {
    return 'Confirm password does not match';
  }

  return '';
}

export { validateEmail, validatePassword, validateConfirmPassword };
