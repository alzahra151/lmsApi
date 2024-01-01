const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();
const studentRoutes = require("./student/studentRoutes");
const userController = require("../controller/user")
const { loginValidator } = require("../middleware's/validation/userValidation")

routes.use("/admin", adminRoutes);
routes.use("/", studentRoutes);
routes.route("/login").post(loginValidator(), userController.login)

module.exports = routes;
