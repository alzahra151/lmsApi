const { Router } = require("express");
const adminRoutes = Router();
const adminController = require("../../controller/adminController/adminController");
const authorization = require("../../middleware's/authorization");
// const { addUser, updateUser, getUserById } = require("../../controller/user")
const userController = require("../../controller/user")
const upload = require("../../controller/multer")

adminRoutes.route("/courses").get(adminController.getAllcourses);

adminRoutes.route("/users")
    .get(authorization, adminController.getAllusers);
adminRoutes.route("/add-user")
    .post(authorization, upload.single('photo'), userController.addUser)
adminRoutes.route("/user/:id")
    .get(userController.getUserById)
    .patch(authorization, upload.single('photo'), userController.updateUser)
module.exports = adminRoutes;
