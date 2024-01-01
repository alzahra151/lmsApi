const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();
const studentRoutes = require("./student/studentRoutes");
const userController = require("../controller/user")
const validator = require("../validations/loginValidation")

routes.use("/admin", adminRoutes);
routes.use("/", studentRoutes);
routes.route("/login").post(validator, userController.login)

module.exports = routes;
