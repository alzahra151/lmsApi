const { validationResult } = require("express-validator");
const ApiError = require("../../helpers/apiError");

function checkErrorFromValidation(req, res, next) {
  try {
    let errors = {};
    let result = validationResult(req);

    if (result.isEmpty()) return next();

    for (const err of result.array()) {
      const { path, msg } = err;
      if (Object.prototype.hasOwnProperty.call(errors, path)) continue;
      errors[path] = msg;
    }

    throw new ApiError(errors, 422);
  } catch (error) {
    next(error);
  }
}

module.exports = checkErrorFromValidation;
