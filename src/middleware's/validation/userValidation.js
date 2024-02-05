const { body, validationResult } = require("express-validator");

const loginValidator = () => {
  return [
    body("mobile")
      .notEmpty()
      .withMessage((value, { req }) => {
        return req.t("mobileRequiredMsg");
      })
      .isMobilePhone()
      .withMessage((value, { req }) => {
        return req.t("mobileValidationMsg");
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage((value, { req }) => {
        return req.t("passwordValidationMsg");
      }),
  ];
};
const adduserValidator = () => {
  return [
    body("first_name")
      .isAlpha()
      .isLength({ min: 3, max: 15 })
      .withMessage((value, { req }) => {
        return req.t("nameValidationMsg");
      }),
    body("last_name")
      .isLength({ min: 3, max: 15 })
      .withMessage((value, { req }) => {
        return req.t("nameValidationMsg");
      }),
    body("email")
      .optional()
      .isEmail()
      .withMessage((value, { req }) => {
        return req.t("emailValidMsg");
      }),
    body("mobile")
      .notEmpty()
      .withMessage((value, { req }) => {
        return req.t("mobileRequiredMsg");
      })
      .isMobilePhone()
      .withMessage((value, { req }) => {
        return req.t("mobileValidationMsg");
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage((value, { req }) => {
        return req.t("passwordValidationMsg");
      }),
  ];
};
const updateUserValidator = () => {
  return [
    body("first_name")
      .optional()
      .isLength({ min: 3, max: 15 })
      .withMessage((value, { req }) => {
        return req.t("nameValidationMsg");
      }),
    body("last_name")
      .optional()
      .isLength({ min: 3, max: 15 })
      .withMessage((value, { req }) => {
        return req.t("nameValidationMsg");
      }),
    body("email")
      .optional()
      .isEmail()
      .withMessage((value, { req }) => {
        return req.t("emailValidMsg");
      }),
    body("mobile")
      .optional()
      .notEmpty()
      .withMessage((value, { req }) => {
        return req.t("mobileRequiredMsg");
      })
      .isMobilePhone()
      .withMessage((value, { req }) => {
        return req.t("mobileValidationMsg");
      }),
  ];
};

module.exports = {
  loginValidator,
  adduserValidator,
  updateUserValidator,
};
