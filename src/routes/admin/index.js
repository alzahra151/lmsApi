const { Router } = require("express");
const adminRoutes = Router();
const adminController=require("../../controller/adminController/adminController");
adminRoutes.route("/courses",adminController.getAllcourses);

adminRoutes.route("/users",adminController.getAllusers);

module.exports = adminRoutes;
