const { body, validationResult } = require("express-validator")

const addRateValidation = () => {
  return [
    body("rating")
      .notEmpty()
      .isNumeric()
      .withMessage
      ("rateValidatedMsg")
    ,
    body("user_id")
      .notEmpty()
      .isNumeric()
      .withMessage
      ("userValidatedMsg")
    ,
    body("course_id")
      .notEmpty()
      .isNumeric()
      .withMessage
      ("courseValidatedMsg")
    ,
    body("notes")
      .isString()
      .withMessage
      ("notesValidatedMsg")
    ,
  ]
}
const updateRateValidation = () => {
  return [
    body("rating")
      .optional()
      .notEmpty()
      .isNumeric()
      .withMessage
      ("rateValidatedMsg")
    ,
    body("user_id")
      .optional()
      .notEmpty()
      .isNumeric()
      .withMessage
      ("userValidatedMsg")
    ,
    body("course_id")
      .optional()
      .notEmpty()
      .isNumeric()
      .withMessage
      ("courseValidatedMsg")
    ,
    body("notes")
      .optional()
      .isString()
      .withMessage
      ("notesValidatedMsg")
    ,
  ]
}

module.exports = {
  updateRateValidation,
  addRateValidation,
}
