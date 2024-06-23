function ErrorHandler(err, req, res, next) {
  const errStatus = err.status || err.statusCode || 500;
  const errMsg = err.message || req.t("errors.server");
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
  next();
}

module.exports = ErrorHandler;
