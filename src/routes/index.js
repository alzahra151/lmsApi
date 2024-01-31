const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();
const studentRoutes = require("./student/studentRoutes");
const rateRoutes = require("./reactions/rateRoutes")
const commentRoutes = require("./reactions/commentRoutes")
const enrollmentsRoutes = require("./enrollment/enrollmentRoutes")
const userController = require("../controller/user")
const { loginValidator, validate } = require("../middleware's/validation/userValidation")
const courseRoutes = require("./course/courseRoutes");
const lessonRoutes = require("./lesson/lessonRoutes")

routes.use("/admin", adminRoutes);
routes.use("/", studentRoutes);
routes.route("/login").post(loginValidator(), validate, userController.login)
routes.use("/courses", courseRoutes);
routes.use("/lessons", lessonRoutes);
routes.use("/rates", rateRoutes)
routes.use("/comments", commentRoutes)
routes.use("/enrollments", enrollmentsRoutes)

module.exports = routes;
