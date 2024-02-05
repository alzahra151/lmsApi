const { body, validationResult } = require("express-validator");

const addEnrollmentValidation = () => {
  return [
    body("student_id")
      .notEmpty()
      .isNumeric()
      .withMessage((value, req) => {
        return req.path("enrollmentValidateMsg");
      }),
    body("course_id")
      .notEmpty()
      .isNumeric()
      .withMessage((value, req) => {
        return req.path("enrollmentValidateMsg");
      }),
    body("is_free")
      .notEmpty()
      .isBoolean()
      .withMessage((value, req) => {
        return req.path("enrollmentValidateMsg");
      }),
    body("price")
      .optional()
      .isNumeric()
      .withMessage((value, req) => {
        return req.path("enrollmentValidateMsg");
      }),
    body("discount")
      .optional()
      .isNumeric()
      .withMessage((value, req) => {
        return req.path("enrollmentValidateMsg");
      }),
    body("status")
      .notEmpty()
      .withMessage((value, req) => {
        return req.path("enrollmentValidateMsg");
      }),
  ];
};

module.exports = {
  addEnrollmentValidation,
};
