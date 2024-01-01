const { query, param, body } = require("express-validator");

addCoursevalidator = (req, res, next) => {
  body("title")
    .isAlpha()
    .withMessage("must be all string not number ")
    .notEmpty()
    .withMessage("course must be not empty ");
  body("alt_title")
    .isAlpha()
    .withMessage("must be all string not number ")
    .notEmpty()
    .withMessage("course must be not empty ");
  body("description")
    .isString()
    .withMessage("must be all string  ")
    .notEmpty()
    .withMessage("course must be not empty ");
  body("alt_description")
    .isAlpha()
    .withMessage("must be all string ")
    .notEmpty()
    .withMessage("course must be not empty ");
  body("start_date").isDate().withMessage("the date must be data type of date");
  body("end_date").isDate().withMessage("the date must be data type of date");
  body("is_free").isBoolean().withMessage("is_free must be boolean data type ");
  body("price").isInt().withMessage("price must be number");
  body("discount").isInt().withMessage("discount must be number ");
  body("discount_type").isAlpha().withMessage('discount_type must be string without any number such as ("percentage", "fixed")');
  body("status").isAlpha().withMessage("status must be string without any number such as(pending, active, inactive, rejected)");
  body("teacher_id").isInt().withMessage("teacher_id must be number");
};

module.exports = [addCoursevalidator];
