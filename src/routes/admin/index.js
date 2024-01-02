const { Router } = require("express");
const adminRoutes = Router();
const adminController = require("../../controller/adminController/adminController");
const authorization = require("../../middleware's/authorization");
// const { addUser, updateUser, getUserById } = require("../../controller/user")
const userController = require("../../controller/user")
const { adduserValidator, updateUserValidator, validate } = require("../../middleware's/validation/userValidation")
const upload = require("../../controller/multer")

adminRoutes.route("/courses").get(adminController.getAllcourses);

adminRoutes.route("/users")
    .get(authorization, userController.getAllusers);
adminRoutes.route("/add-user")
    .post(authorization, upload.single('photo'), adduserValidator(), validate, userController.addUser)
adminRoutes.route("/user/:id")
    .get(userController.getUserById)
    .patch(authorization, upload.single('photo'), updateUserValidator(), validate, userController.updateUser)
module.exports = adminRoutes;
