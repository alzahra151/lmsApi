const { body } = require("express-validator");

const checkCreateExamScheme = [
  body("title").notEmpty().withMessage("fieldRequired"),
  body("start_date")
    .notEmpty()
    .withMessage("fieldRequired")
    .isISO8601("yyyy-mm-dd")
    .withMessage("invalidDateType"),
  body("end_date")
    .notEmpty()
    .withMessage("fieldRequired")
    .isISO8601("yyyy-mm-dd")
    .withMessage("invalidDateType"),
  // body("exam_type")
  //   .notEmpty()
  //   .withMessage("fieldRequired")
  //   .isIn(["mcq"])
  //   .withMessage("invalidExamType"),
  body("class_id").notEmpty().withMessage("fieldRequired"),
  body("course_id").notEmpty().withMessage("fieldRequired"),
  // body("teacher_id").notEmpty().withMessage("fieldRequired"),
  body("lesson_ids")
    .notEmpty()
    .withMessage("fieldRequired")
    .isArray()
    .withMessage("arrayType"),
  body("questions")
    .notEmpty()
    .withMessage("fieldRequired")
    .isArray()
    .withMessage("arrayType"),
  body("questions.*.title").notEmpty().withMessage("fieldRequired"),
  body("questions.*.degree")
    .notEmpty()
    .withMessage("fieldRequired")
    .isInt()
    .withMessage("invalidNumberType"),
  body("questions.*.duration")
    .notEmpty()
    .withMessage("fieldRequired")
    .isInt()
    .withMessage("invalidNumberType"),
  body("questions.*.answers")
    .notEmpty()
    .withMessage("fieldRequired")
    .isArray()
    .withMessage("arrayType")
    .if(body("exam_type").custom((value) => value == "mcq"))
    .isArray({ min: 2, max: 4 })
    .withMessage("examAnswerLength"),
  body("questions.*.answers.*.title").notEmpty().withMessage("fieldRequired"),
  body("questions.*.answers.*.is_correct")
    .notEmpty()
    .withMessage("fieldRequired")
    .isBoolean()
    .withMessage("invalidBooleanType")
    .custom((value, { path, req }) => {
      // const { path } = ctx;

      const matched = path?.match?.(/\d+/gi);
      if (!matched || !matched.length) return true;
      // if (!matched) return true;

      const [questionIndex] = matched;
      const currentQuestion = req.body?.questions?.[questionIndex];

      const correctAnswers = currentQuestion?.answers?.filter(
        (answer) => answer.is_correct
      );
      if (!correctAnswers.length) throw new Error("minAnswerCorrectValue");
      if (correctAnswers.length > 1 && value)
        throw new Error("oneAnswerCorrectValue");

      return true;
    }),
];

const correctExamScheme = [
  body("exam_id").notEmpty().withMessage("fieldRequired"),
  body("questions")
    .notEmpty()
    .withMessage("fieldRequired")
    .isArray()
    .withMessage("arrayType"),
  body("questions.*.id").notEmpty().withMessage("fieldRequired"),
  body("questions.*.answer_id").notEmpty().withMessage("fieldRequired"),
  // body("questions.*.duration")
  //   .notEmpty()
  //   .withMessage("fieldRequired")
  //   .isInt()
  //   .withMessage("invalidNumberType"),
];

module.exports = { checkCreateExamScheme, correctExamScheme };
