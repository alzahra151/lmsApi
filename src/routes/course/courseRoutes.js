const { Router } = require("express");
const courseRoutes = Router();
const courseController = require("../../controller/courseController/courseController");
const authorization = require("../..//middleware's/authorization")
const {
  addCourseValidator,
  updateCourseValidator,
  deleteCousreValidator,
} = require("../../middleware's/validation/cousreValidation");
const { validate } = require("../../middleware's/validation");
const upload = require("../../controller/multer");
// courseRoutes.get("/courses", courseController.);
courseRoutes.route("/courses").get(courseController.getAllCourses)
courseRoutes.post("/", upload.single("poster"), authorization, courseController.addCourse);
courseRoutes.get("/:id", courseController.getCourseById);
courseRoutes.put(
  "/:id",
  updateCourseValidator(),
  courseController.updateCourseById
);
courseRoutes.delete(
  "/:id",
  deleteCousreValidator(),
  courseController.deleteCousreById
);

module.exports = courseRoutes;
