const { Router } = require("express");
const studentRoutes = Router();
const studentController = require("../../controller/studentController/studentController");
const {
  startExam,
  correctExam,
  getStudentExam,
} = require("../../controller/exams");

const { validate } = require("../../middleware's/validation");
const {
  correctExamScheme,
} = require("../../middleware's/validation/examValidation");

studentRoutes.get("courses", studentController.getAllCourses);
studentRoutes.get("courses/:id", studentController.getCourseById);
studentRoutes.get("/courses", studentController.getAllCourses);
studentRoutes.get("/courses/:id", studentController.getCourseById);

// exams routes
studentRoutes.get("/exams/:id", getStudentExam);
studentRoutes.post("/exams/start/:id", startExam);
studentRoutes.post("/exams/correct", correctExamScheme, validate, correctExam);

// rate routes

module.exports = studentRoutes;
