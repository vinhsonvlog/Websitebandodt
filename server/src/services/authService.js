const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userStore = require('../data/store/userStore');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const RESET_CODE_REGEX = /^\d{6}$/;
const RESET_CODE_TTL_MS = 10 * 60 * 1000;

function createServiceError(message, code, status = 400) {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  return error;
}

function validateEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();

  if (!normalizedEmail) {
    throw createServiceError('Email is required', 'EMAIL_REQUIRED');
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw createServiceError('Email format is invalid', 'EMAIL_INVALID');
  }

  return normalizedEmail;
}

function validatePassword(password) {
  if (!password) {
    throw createServiceError('Password is required', 'PASSWORD_REQUIRED');
  }

  if (String(password).length < MIN_PASSWORD_LENGTH) {
    throw createServiceError('Password must be at least 6 characters', 'PASSWORD_TOO_SHORT');
  }
}

function validateResetCode(code) {
  const normalizedCode = String(code || '').trim();

  if (!normalizedCode) {
    throw createServiceError('Reset code is required', 'RESET_CODE_REQUIRED');
  }

  if (!RESET_CODE_REGEX.test(normalizedCode)) {
    throw createServiceError('Reset code must contain 6 digits', 'RESET_CODE_INVALID_FORMAT');
  }

  return normalizedCode;
}

function generateResetCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function createToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw createServiceError('Server JWT is not configured', 'JWT_SECRET_MISSING', 500);
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    { expiresIn: '1d' }
  );
}

function buildAuthResult(user) {
  return {
    token: createToken(user),
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

async function register(payload) {
  const normalizedEmail = validateEmail(payload?.email);
  validatePassword(payload?.password);

  if (payload?.password !== payload?.confirmPassword) {
    throw createServiceError('Confirm password does not match', 'CONFIRM_PASSWORD_MISMATCH');
  }

  const existingUser = await userStore.findUserByEmail(normalizedEmail);
  if (existingUser) {
    throw createServiceError('Email is already registered', 'EMAIL_EXISTS');
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = {
    id: `user_${Date.now()}`,
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  await userStore.createUser(user);
  return buildAuthResult(user);
}

async function login(payload) {
  const normalizedEmail = validateEmail(payload?.email);
  validatePassword(payload?.password);

  const user = await userStore.findUserByEmail(normalizedEmail);
  if (!user) {
    throw createServiceError('Email or password is incorrect', 'AUTH_INVALID_CREDENTIALS', 401);
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.passwordHash);
  if (!isPasswordMatched) {
    throw createServiceError('Email or password is incorrect', 'AUTH_INVALID_CREDENTIALS', 401);
  }

  return buildAuthResult(user);
}

async function forgotPassword(payload) {
  const normalizedEmail = validateEmail(payload?.email);
  const user = await userStore.findUserByEmail(normalizedEmail);

  if (!user) {
    return { email: normalizedEmail };
  }

  const resetCode = generateResetCode();
  const resetPasswordCodeHash = await bcrypt.hash(resetCode, 10);
  const resetPasswordExpiresAt = new Date(Date.now() + RESET_CODE_TTL_MS).toISOString();

  await userStore.updateUserByEmail(normalizedEmail, {
    resetPasswordCodeHash,
    resetPasswordExpiresAt,
  });

  const response = { email: normalizedEmail, expiresAt: resetPasswordExpiresAt };

  if (process.env.NODE_ENV !== 'production') {
    response.resetCode = resetCode;
  }

  return response;
}

async function resetPassword(payload) {
  const normalizedEmail = validateEmail(payload?.email);
  const resetCode = validateResetCode(payload?.resetCode);
  validatePassword(payload?.newPassword);

  if (payload?.newPassword !== payload?.confirmPassword) {
    throw createServiceError('Confirm password does not match', 'CONFIRM_PASSWORD_MISMATCH');
  }

  const user = await userStore.findUserByEmail(normalizedEmail);
  if (!user?.resetPasswordCodeHash || !user?.resetPasswordExpiresAt) {
    throw createServiceError('Reset code is invalid or has expired', 'RESET_CODE_INVALID_OR_EXPIRED', 400);
  }

  const expiresAt = new Date(user.resetPasswordExpiresAt).getTime();
  if (Number.isNaN(expiresAt) || expiresAt < Date.now()) {
    throw createServiceError('Reset code is invalid or has expired', 'RESET_CODE_INVALID_OR_EXPIRED', 400);
  }

  const isCodeMatched = await bcrypt.compare(resetCode, user.resetPasswordCodeHash);
  if (!isCodeMatched) {
    throw createServiceError('Reset code is invalid or has expired', 'RESET_CODE_INVALID_OR_EXPIRED', 400);
  }

  const passwordHash = await bcrypt.hash(payload.newPassword, 10);
  await userStore.updateUserByEmail(normalizedEmail, {
    passwordHash,
    resetPasswordCodeHash: null,
    resetPasswordExpiresAt: null,
  });

  return {
    email: normalizedEmail,
    updatedAt: new Date().toISOString(),
  };
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
