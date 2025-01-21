const { Router } = require("express");
const enrollmentRoutes = Router();
const authorization = require("../../middleware's/authorization");
const enrollmentController = require("../../controller/enrollmentController/enrollment");
const {
  addEnrollmentValidation,
} = require("../../middleware's/validation/enrollmentValidation");
const { validate } = require("../../middleware's/validation")

// enrollment routes
enrollmentRoutes
  .route("/add")
  .post(addEnrollmentValidation(), validate, authorization, enrollmentController.addEnrollment);
enrollmentRoutes
  .route("/")
  .get(authorization, enrollmentController.getEnrollements);
enrollmentRoutes
  .route("/student")
  .get(authorization, enrollmentController.getstudentEnrollmentCourses);
enrollmentRoutes
  .route("/status")
  .get(authorization, enrollmentController.getStudentEnrollmentsStatus);
enrollmentRoutes
  .route("/:id")
  .patch(authorization, enrollmentController.updateEnrollment)
  .delete(authorization, enrollmentController.deleteEnrollment);
enrollmentRoutes
  .route("/course/:course_id")
  .get(enrollmentController.getCourseEnrollments);
enrollmentRoutes
  .route("/class/:class_id")
  .get(enrollmentController.getClassEnrollments);
enrollmentRoutes
  .route("/check/:course_id")
  .get(authorization, enrollmentController.checkEnrollment);
module.exports = enrollmentRoutes;
