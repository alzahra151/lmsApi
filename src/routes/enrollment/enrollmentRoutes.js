const { Router } = require("express");
const enrollmentRoutes = Router();
const authorization = require("../../middleware's/authorization");
const enrollmentController = require("../../controller/enrollmentController/enrollment")
const { addEnrollmentValidation, validate } = require("../../middleware's/validation/enrollmentValidation")

// enrollment routes    
enrollmentRoutes.route(addEnrollmentValidation(), validate, "/add-enrollment")
    .post(authorization, enrollmentController.addEnrollment)
enrollmentRoutes.route("/enrollments")
    .get(authorization, enrollmentController.getEnrollements)
enrollmentRoutes.route("/enrollment/:id")
    .patch(authorization, enrollmentController.updateEnrollment)
    .delete(authorization, enrollmentController.deleteEnrollment)
enrollmentRoutes.route("enrollments/:course_id")
    .get(enrollmentController.getCourseEnrollments)

module.exports = enrollmentRoutes