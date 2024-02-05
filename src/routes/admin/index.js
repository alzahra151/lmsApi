const { Router } = require("express");
const adminRoutes = Router();
const adminController = require("../../controller/adminController/adminController");
const authorization = require("../../middleware's/authorization");
// const { addUser, updateUser, getUserById } = require("../../controller/user")
const {
  adduserValidator,
  updateUserValidator,
} = require("../../middleware's/validation/userValidation");
const upload = require("../../controller/multer");
const { createNewExam, getExam } = require("../../controller/exams");
const userController = require("../../controller/user");
const { validate } = require("../../middleware's/validation");
const {
  checkCreateExamScheme,
} = require("../../middleware's/validation/examValidation");

adminRoutes.route("/courses").get(adminController.getAllcourses);

adminRoutes.route("/users").get(authorization, userController.getAllusers);
adminRoutes.route("/add-user").post(
  authorization,
  upload.single("photo"),
  adduserValidator(),

  userController.addUser
);
adminRoutes.route("/user/:id").get(userController.getUserById).patch(
  authorization,
  upload.single("photo"),
  updateUserValidator(),

  userController.updateUser
);

adminRoutes.route("/courses").get(adminController.getAllcourses);
// user routes
adminRoutes.route("/users").get(authorization, userController.getAllusers);
adminRoutes.route("/add-user").post(
  authorization,
  upload.single("photo"),
  adduserValidator(),

  userController.addUser
);
adminRoutes.route("/user/:id").get(userController.getUserById).patch(
  authorization,
  upload.single("photo"),
  updateUserValidator(),

  userController.updateUser
);

adminRoutes.get("/exams/:id", getExam);
adminRoutes.post("/exams/add", checkCreateExamScheme, validate, createNewExam);

module.exports = adminRoutes;
