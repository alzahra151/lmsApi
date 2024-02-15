const { Router } = require("express");
const studentRoutes = Router();
const studentController = require("../../controller/studentController/studentController");

studentRoutes.get("/courses", studentController.getAllCourses);
studentRoutes.get("/courses/:id", studentController.getCourseById);


module.exports = studentRoutes;
