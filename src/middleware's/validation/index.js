const { validationResult } = require("express-validator");
const ApiError = require("../../helpers/apiError");
const i18next = require("i18next");

function validate(req, res, next) {
  try {
    let result = {};
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const err = errors.array();

    for (const error of err) {
      let { msg, path } = error;

      if (Object.prototype.hasOwnProperty.call(result, path)) continue;

      if (i18next.exists(msg)) msg = req.t(msg);

      result[path] = msg;
    }
    throw new ApiError(result, 422);
  } catch (error) {
    next(error);
  }
}

module.exports = { validate };
