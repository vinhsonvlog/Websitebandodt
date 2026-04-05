const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const data = await authService.register(req.body);
    return res.status(201).json({ success: true, data, message: 'Register successful' });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const data = await authService.login(req.body);
    return res.status(200).json({ success: true, data, message: 'Login successful' });
  } catch (error) {
    return next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const data = await authService.forgotPassword(req.body);
    return res.status(200).json({ success: true, data, message: 'Reset code sent successfully' });
  } catch (error) {
    return next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const data = await authService.resetPassword(req.body);
    return res.status(200).json({ success: true, data, message: 'Password reset successful' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
