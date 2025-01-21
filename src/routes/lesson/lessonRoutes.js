const { Router } = require("express");
const lessonRoutes = Router();
const lessonController = require("../../controller/lessonController/lessonController");
const authorization = require("../../middleware's/authorization");
const {
  addLessonValidator,
  updateLessonValidator,
  deleteLessonValidator,
  validate,
} = require("../../middleware's/validation/lessonValidation");


lessonRoutes.get("/", lessonController.getAllLessons);
lessonRoutes.get("/course/:id", authorization, lessonController.getCourseLessons);
lessonRoutes.get("/:id", lessonController.getLessonById);
lessonRoutes.put(
  "/:id",
  updateLessonValidator(),
  lessonController.updateLessonById
);
lessonRoutes.delete(
  "/:id",
  deleteLessonValidator,
  lessonController.deleteLessonById
);

module.exports = lessonRoutes;
