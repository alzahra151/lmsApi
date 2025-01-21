const { body, validationResult } = require("express-validator")

const addEnrollmentValidation = () => {
  return [
    // body("student_id")
    //   .notEmpty()
    //   .isNumeric()
    //   .withMessage
    //   ("enrollmentValidateMsg")
    // ,
    body("course_id")
      .notEmpty()
      .isNumeric()
      .withMessage
      ("enrollmentValidateMsg")
    ,
    body("status")
      .notEmpty()
      .withMessage
      ("enrollmentValidateMsg")
    ,
  ]
}

module.exports = {
  addEnrollmentValidation,
}
