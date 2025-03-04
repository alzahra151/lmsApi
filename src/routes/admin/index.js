const { Router } = require("express");
const adminRoutes = Router();
const adminController = require("../../controller/adminController/adminController");
const authorization = require("../../middleware's/authorization");
const checkPermissions = require("../../middleware's/permission");
const { adduserValidator, updateUserValidator } = require("../../middleware's/validation/userValidation");
const upload = require("../../controller/multer");
const { createNewExam, getExam, getExams, getCourserExams, getExamStudents } = require("../../controller/exams");
const userController = require("../../controller/user");
const { validate } = require("../../middleware's/validation");
const { checkCreateExamScheme } = require("../../middleware's/validation/examValidation");
const { addRole, getRole } = require('../../controller/roleController/role')
const { addLesson, sseConfig } = require("../../controller/lesson/lesson")
const { addLessonValidator } = require("../../middleware's/validation/lessonValidation")
const multer = require('multer');

const uploadVideo = multer({
    storage: multer.diskStorage({}),
});

adminRoutes.post("/lessons/add", uploadVideo.single("video_url"), addLesson);


adminRoutes.route("/courses").get(adminController.getAllcourses);
adminRoutes.route("/course/:id").get(adminController.getCourseById);

adminRoutes.route("/users").get(userController.getAllusers);
adminRoutes.route("/teachers").get(userController.getTeachers);

adminRoutes.route("/add-user").post(
    // authorization,
    // checkPermissions.checkPermission('add_user'),
    upload.single("photo"),
    // adduserValidator(),
    // validate,
    userController.addUser
);
adminRoutes.route("/user/:id").get(userController.getUserById).patch(
    authorization,
    upload.single("photo"),
    updateUserValidator(),
    validate,
    userController.updateUser
);
adminRoutes.get("/exams", getExams);
adminRoutes.get("/exams/:id", getExam);
adminRoutes.post("/exams/add", authorization, checkCreateExamScheme, validate, createNewExam);
adminRoutes.get('/course/:id/exam', getCourserExams)
adminRoutes.get('/exam/:id/students', getExamStudents)


adminRoutes.get("/lessons/events", sseConfig);
adminRoutes.post("/role/add", addRole)
adminRoutes.get("/role/:id", getRole)

module.exports = adminRoutes;
