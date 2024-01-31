const { Router } = require("express");
const adminRoutes = Router();
const adminController = require("../../controller/adminController/adminController");
const authorization = require("../../middleware's/authorization");
const enrollmentController = require("../../controller/enrollmentController/enrollment")
const userController = require("../../controller/user")
const { adduserValidator, updateUserValidator, validate } = require("../../middleware's/validation/userValidation")
const upload = require("../../controller/multer")

adminRoutes.route("/courses").get(adminController.getAllcourses);
// user routes
adminRoutes.route("/users")
    .get(authorization, userController.getAllusers);
adminRoutes.route("/add-user")
    .post(authorization, upload.single('photo'), adduserValidator(), validate, userController.addUser)
adminRoutes.route("/user/:id")
    .get(userController.getUserById)
    .patch(authorization, upload.single('photo'), updateUserValidator(), validate, userController.updateUser)
// enrollment routes    
adminRoutes.route("/add-enrollment")
    .post(authorization, enrollmentController.addEnrollment)
adminRoutes.route("/enrollments")
    .get(authorization, enrollmentController.getEnrollements)
adminRoutes.route("/enrollment/:id")
    .patch(authorization, enrollmentController.updateEnrollment)
    .delete(authorization, enrollmentController.deleteEnrollment)
adminRoutes.route("enrollments/:course_id")
    .get(enrollmentController.getCourseEnrollments)

module.exports = adminRoutes;
