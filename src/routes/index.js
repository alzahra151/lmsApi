const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();
const studentRoutes = require("./student/studentRoutes");
const userController = require("../controller/user");
const {
  loginValidator,
  validate,
} = require("../middleware's/validation/userValidation");
const checkErrorFromValidation = require("../middleware's/validation/checkErrorFromValidation");

routes.use("/admin", adminRoutes);
routes.use("/", studentRoutes);
routes
  .route("/login")
  .post(loginValidator(), checkErrorFromValidation, userController.login);

module.exports = routes;
