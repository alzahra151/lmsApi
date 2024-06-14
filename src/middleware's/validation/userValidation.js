const { body, validationResult } = require("express-validator")

const loginValidator = () => {
  return [
    body("mobile")
      .notEmpty()
      .withMessage("mobileRequiredMsg")
      .isMobilePhone()
      .withMessage("mobileValidationMsg")
    ,
    body("password")
      .isLength({ min: 6 })
      .withMessage("passwordValidationMsg"),
  ]
}
const adduserValidator = () => {
  return [
    body("first_name")
      .isAlpha()
      .isLength({ min: 3, max: 15 })
      .withMessage("nameValidationMsg"),
    body("last_name")
      .isLength({ min: 3, max: 15 })
      .withMessage("nameValidationMsg"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("emailValidMsg"),
    body("mobile")
      .notEmpty()
      .withMessage("mobileRequiredMsg")

      .isMobilePhone()
      .withMessage("mobileValidationMsg")
    ,
    body("password")
      .isLength({ min: 6 })
      .withMessage("passwordValidationMsg")

  ]
}
const updateUserValidator = () => {
  return [
    body("first_name")
      .optional()
      .isLength({ min: 3, max: 15 })
      .withMessage("nameValidationMsg"),
    body("last_name")
      .optional()
      .isLength({ min: 3, max: 15 })
      .withMessage("nameValidationMsg")
    ,
    body("email")
      .optional()
      .isEmail()
      .withMessage("emailValidMsg"),
    body("mobile")
      .optional()
      .notEmpty()
      .withMessage("mobileRequiredMsg")
      .isMobilePhone()
      .withMessage("mobileValidationMsg")
  ]
}

module.exports = {
  loginValidator,
  adduserValidator,
  updateUserValidator,
}
