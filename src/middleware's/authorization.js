const ApiError = require("../helpers/apiError");

async function authorization(req, res, next) {
  try {
    const token = req.header("authorization");
    const secure = /bearer+/gi.test(token);

    if (!token) throw new ApiError("Token is required", 401);
    if (!secure) throw new ApiError("bearer is required", 401);
    // complete process

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
