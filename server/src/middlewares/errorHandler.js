function errorHandler(error, req, res, next) {
  const status = Number(error.status) || 400;
  const message = error.message || 'Request failed';

  return res.status(status).json({
    success: false,
    message,
    ...(error.code ? { code: error.code } : {}),
  });
}

module.exports = {
  errorHandler,
};
