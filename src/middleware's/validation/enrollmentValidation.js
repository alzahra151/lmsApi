const { body, validationResult } = require("express-validator")

const addEnrollmentValidation = () => {
  return [
    body("student_id")
      .notEmpty()
      .isNumeric()
      .withMessage
      ("enrollmentValidateMsg")
    ,
    body("course_id")
      .notEmpty()
      .isNumeric()
      .withMessage
      ("enrollmentValidateMsg")
    ,
    body("is_free")
      .notEmpty()
      .isBoolean()
      .withMessage
      ("enrollmentValidateMsg")
    ,
    body("price")
      .optional()
      .isNumeric()
      .withMessage
      ("enrollmentValidateMsg")
    ,
    body("discount")
      .optional()
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
