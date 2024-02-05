const { body, validationResult } = require("express-validator");

const addRateValidation = () => {
  return [
    body("rating")
      .notEmpty()
      .isNumeric()
      .withMessage((value, { req }) => {
        return req.t("rateValidatedMsg");
      }),
    body("user_id")
      .notEmpty()
      .isNumeric()
      .withMessage((value, { req }) => {
        return req.t("userValidatedMsg");
      }),
    body("course_id")
      .notEmpty()
      .isNumeric()
      .withMessage((value, { req }) => {
        return req.t("courseValidatedMsg");
      }),
    body("notes")
      .isString()
      .withMessage((value, { req }) => {
        return req.t("notesValidatedMsg");
      }),
  ];
};
const updateRateValidation = () => {
  return [
    body("rating")
      .optional()
      .notEmpty()
      .isNumeric()
      .withMessage((value, { req }) => {
        return req.t("rateValidatedMsg");
      }),
    body("user_id")
      .optional()
      .notEmpty()
      .isNumeric()
      .withMessage((value, { req }) => {
        return req.t("userValidatedMsg");
      }),
    body("course_id")
      .optional()
      .notEmpty()
      .isNumeric()
      .withMessage((value, { req }) => {
        return req.t("courseValidatedMsg");
      }),
    body("notes")
      .optional()
      .isString()
      .withMessage((value, { req }) => {
        return req.t("notesValidatedMsg");
      }),
  ];
};

module.exports = {
  updateRateValidation,
  addRateValidation,
};
