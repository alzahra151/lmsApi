const { query, param, body, validationResult } = require("express-validator");
const db = require("../../models");

const addLessonValidator = () => {
  return [
    body("title")
      .notEmpty()
      .matches(/^[a-zA-Z][a-zA-Z0-9\s]{2,}$/)
      .withMessage(
        "Title must contain only English letters, numbers, and spaces with length at least 3 characters"
      ),

    // body("alt_title")
    //   .optional()
    //   .withMessage("alt_title must be arabic string "),

    body("description")
      .notEmpty()
      .withMessage("description must be not empty ")
      .isString()
      .withMessage("description must be all string  "),

    // body("alt_description")
    //   .optional()
    //   // .withMessage("alt_description must be not empty ")
    //   // .matches(/^[\p{Script=Arabic}]+$/u)
    //   .withMessage("alt_description must be all string "),


    body("course_id")
      .notEmpty()
      .isInt()
      .withMessage("course_id must be number")
      .custom(async (value) => {
        const course = await db.Course.findByPk(value);
        if (!course) {
          throw new Error("Invalid course_id");
        }
      }),

    // body("video_url")
    //   .notEmpty()
    //   .withMessage("video url must be not empty ")
    //   .isString()
    //   .withMessage("video must be all string")
    //   .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/)
    //   .withMessage("video url must be all string and correct url"),

    body("duration")
      .notEmpty()
      .isInt()
      .withMessage("duration must be number "),

    body("is_free")
      .notEmpty()
      .isBoolean()
      .withMessage("is_free must be boolean data type ")
  ];
};

const updateLessonValidator = () => {
  return [
    param('id')
      .custom(async (value) => {
        if (!Number.isInteger(Number(value))) {
          throw new Error("Lesson id must be a number");
        }
        const lesson = await db.Lesson.findByPk(value);
        if (!lesson) {
          throw new Error("lesson not found");
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
      .notEmpty()
      .withMessage("alt_title must be not empty ")
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
      .notEmpty()
      .withMessage("alt_description must be not empty ")
      .matches(/^[\p{Script=Arabic}]+$/u)
      .withMessage("alt_description must be all string "),

    body("course_id")
      .isInt()
      .withMessage("course_id must be number")
      .optional()
      .custom(async (value) => {
        const course = await db.Course.findByPk(value);
        if (!course) {
          throw new Error("Invalid course_id");
        }
      }),

    body("video_url")
      .notEmpty()
      .withMessage("video url must be not empty ")
      .isString()
      .withMessage("video must be all string")
      .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/)
      .withMessage("video url must be all string and correct url"),

    body("duration").isInt().withMessage("duration must be number "),

    body("is_free")
      .isBoolean()
      .withMessage("is_free must be boolean data type "),
  ];
};

const deleteLessonValidator = () => {
  return [
    param('id')
      .custom(async (value) => {
        if (!Number.isInteger(Number(value))) {
          throw new Error("Lesson id must be a number");
        }
        const lesson = await db.Lesson.findByPk(value);
        if (!lesson) {
          throw new Error("Lesson not found");
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
module.exports = { addLessonValidator, updateLessonValidator, deleteLessonValidator, validate };
