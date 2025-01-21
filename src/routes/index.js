const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();
const studentRoutes = require("./student/studentRoutes");
const { loginValidator } = require("../middleware's/validation/userValidation");
const checkErrorFromValidation = require("../middleware's/validation/checkErrorFromValidation");
const rateRoutes = require("./reactions/rateRoutes");
const commentRoutes = require("./reactions/commentRoutes");
const enrollmentsRoutes = require("./enrollment/enrollmentRoutes");
const userController = require("../controller/user");
const courseRoutes = require("./course/courseRoutes");
const lessonRoutes = require("./lesson/lessonRoutes");
const classController = require('../controller/class/class')
const { validate } = require("../middleware's/validation");

// routes.use("/admin", adminRoutes);
// routes.use("/", studentRoutes);

routes
  .route("/api/login")
  .post(loginValidator(), validate, checkErrorFromValidation, userController.login);

routes.use("/api/admin", adminRoutes);
routes.use("/api/student", studentRoutes);
routes.route("/api/login").post(loginValidator(), userController.login);
routes.use("/api/courses", courseRoutes);
routes.use("/api/lessons", lessonRoutes);
routes.use("/api/rates", rateRoutes);
routes.use("/api/comments", commentRoutes);
routes.use("/api/enrollments", enrollmentsRoutes);
//class routes
routes.get('/api/classes', classController.getClasses)

module.exports = routes;
