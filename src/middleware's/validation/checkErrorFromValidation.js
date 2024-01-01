const { validationResult } = require("express-validator");

checkErrorFromValidation = (req, res, next) => {
  let result = validationResult(req);
  if (result.errors.length == 0) {
    next();
  } else {
    let errorMessage = result.errors.reduce(
      (cur, obj) => cur + obj.msg + " , ",
      " "
    );
    let error = new Error(errorMessage);
    error.status = 422;
    next(error);
  }
};

module.exports=checkErrorFromValidation;