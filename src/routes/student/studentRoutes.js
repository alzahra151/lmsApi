const { Router } = require("express");
const studentRoutes = Router();
const studentController = require("../../controller/studentController/studentController");
const {
  startExam,
  correctExam,
  getStudentExam,
} = require("../../controller/exams");

studentRoutes.get("courses", studentController.getAllCourses);
studentRoutes.get("courses/:id", studentController.getCourseById);
studentRoutes.post("/exams/start/:id", startExam);
studentRoutes.post("/exams/correct", correctExam);
studentRoutes.get("/exams/:id", getStudentExam);

module.exports = studentRoutes;
