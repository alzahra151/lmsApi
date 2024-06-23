const { Router } = require("express");
const adminRoutes = Router();
const adminController = require("../../controller/adminController/adminController");
const authorization = require("../../middleware's/authorization");
adminRoutes.route("/courses").get(adminController.getAllcourses);

adminRoutes.route("/users").get(adminController.getAllusers);

module.exports = adminRoutes;
