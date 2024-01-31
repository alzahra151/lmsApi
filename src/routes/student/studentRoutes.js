const { Router } = require("express");
const studentRoutes = Router();
const studentController = require("../../controller/studentController/studentController");
const rateController = require("../../controller/reactionsController/rate")
const authorization = require("../../middleware's/authorization")
studentRoutes.get("/courses", studentController.getAllCourses);
studentRoutes.get("/courses/:id", studentController.getCourseById);
// rate routes
studentRoutes.route("/add-rate").post(authorization, rateController.addRate)
studentRoutes.route("/rate/:id").post(rateController.updateRate)

module.exports = studentRoutes;
