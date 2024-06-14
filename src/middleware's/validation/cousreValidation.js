const { query, param, body, validationResult } = require("express-validator");
const db = require("../../models");

const addCourseValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title must be not empty")
      .matches(/^[a-zA-Z][a-zA-Z0-9\s]{2,}$/)
      .withMessage(
        "Title must contain only English letters, numbers, and spaces with length at least 3 characters"
      ),

    body("alt_title")
      .optional()
      .matches(/^[\p{Script=Arabic}]+$/u)
      .withMessage("alt_title must be arabic string "),

    body("description")
      .notEmpty()
      .withMessage("description must be not empty ")
      .isString()
      .withMessage("description must be all string  "),

    body("alt_description")
      .optional()
      .matches(/^[\p{Script=Arabic}]+$/u)
      .withMessage("alt_description must be all string "),

    body("start_date")
      .custom(value => {
        if (isValidDateFormat(value)) {
          return true;
        } else {
          throw new Error('Invalid date format');
        }
      }),
    // .isDate()
    // .withMessage("the end date must be data type of date"),

    body("end_date")
      .optional()
      .isDate()
      .withMessage("the end date must be data type of date"),

    body("is_free")
      .optional()
      .isBoolean()
      .withMessage("is_free must be boolean data type "),

    body("price")
      .optional()
      .isInt().withMessage("price must be number"),

    body("discount")
      .optional()
      .isInt().withMessage("discount must be number "),

    body("discount_type")
      .optional()
      .isIn(["percentage", "fixed"])
      .withMessage("discount_type must be either 'percentage' or 'fixed' "),

    body("status")
      .isIn(["pending", "active", "inactive", "rejected"])
      .withMessage(
        "status must be either 'pending' or 'active' or 'inactive' or 'rejected'"
      ),
  ];
};
function isValidDateFormat(dateString) {
  // Validate the date format using a regular expression
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return dateFormatRegex.test(dateString);
}
const updateCourseValidator = () => {
  return [
    param('id')
      .custom(async (value) => {
        if (!Number.isInteger(Number(value))) {
          throw new Error("Course id must be a number");
        }
        const course = await db.Course.findByPk(value);
        if (!course) {
          throw new Error("Course not found");
        }
      })
    , body("title")
      .optional()
      .notEmpty()
      .withMessage("title must be not empty")
      .matches(/^[a-zA-Z][a-zA-Z0-9\s]{2,}$/)
      .withMessage(
        "Title must contain only English letters, numbers, and spaces with length at least 3 characters"
      ),

    body("alt_title")
      .optional()
      .matches(/^[\p{Script=Arabic}]+$/u)
      .withMessage("alt_title must be all string "),

    body("description")
      .optional()
      .isString()
      .withMessage("description must be all string  ")
      .notEmpty()
      .withMessage("description course must be not empty "),

    body("alt_description")
      .optional()
      .matches(/^[\p{Script=Arabic}]+$/u)
      .withMessage("alt_description must be all string "),

    body("start_date")
      .optional()
      .isDate()
      .withMessage("the start date must be data type of date"),

    body("end_date")
      .optional()
      .isDate()
      .withMessage("the end date must be data type of date"),

    body("is_free")
      .optional()
      .isBoolean()
      .withMessage("is_free must be boolean data type "),

    body("price").optional().isInt().withMessage("price must be number"),

    body("discount").optional().isInt().withMessage("discount must be number "),

    body("discount_type")
      .optional()
      .isIn(["percentage", "fixed"])
      .withMessage("discount_type must be either 'percentage' or 'fixed' "),

    body("status")
      .optional()
      .isIn(["pending", "active", "inactive", "rejected"])
      .withMessage(
        "status must be either 'pending' or 'active' or 'inactive' or 'rejected'"
      ),

    body("teacher_id")
      .isInt()
      .withMessage("teacher_id must be number")
      .optional()
      .custom(async (value) => {
        const user = await db.User.findByPk(value);
        if (!user) {
          throw new Error("Invalid teacher_id");
        }
      }),
  ];
};

const deleteCousreValidator = () => {
  return [
    param('id')
      .custom(async (value) => {
        if (!Number.isInteger(Number(value))) {
          throw new Error("Course id must be a number");
        }
        const course = await db.Course.findByPk(value);
        if (!course) {
          throw new Error("Course not found");
        }
      })
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ success: false, errors: errors.array() });
};
module.exports = { addCourseValidator, updateCourseValidator, deleteCousreValidator, validate };
