const { Router } = require("express");
const studentRoutes = Router();
const authorization = require("../../middleware's/authorization");
const studentController = require("../../controller/studentController/studentController");
const {
    startExam,
    correctExam,
    getStudentExam,
    getStudentCompleteExams
} = require("../../controller/exams");

const { validate } = require("../../middleware's/validation");
const {
    correctExamScheme,
} = require("../../middleware's/validation/examValidation");

studentRoutes.get("courses", studentController.getAllCourses);
studentRoutes.get("/courses/:id", studentController.getCourseById);

// exams routes
studentRoutes.get("/exams/:id", getStudentExam);
studentRoutes.post("/exams/start/:id", authorization, startExam);
studentRoutes.post("/exams/correct", authorization, correctExamScheme, validate, correctExam);
studentRoutes.get("/exams", authorization, getStudentCompleteExams)

// rate routes


module.exports = studentRoutes;
