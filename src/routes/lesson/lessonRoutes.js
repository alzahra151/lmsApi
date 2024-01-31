const { Router } = require("express");
const lessonRoutes = Router();
const lessonController = require("../../controller/lessonController/lessonController");
const { addLessonValidator, updateLessonValidator, deleteLessonValidator , validate } = require("../../middleware's/validation/lessonValidation");

lessonRoutes.get("/", lessonController.getAllLessons);
lessonRoutes.post("/",addLessonValidator(),validate, lessonController.addLesson);
lessonRoutes.get("/:id", lessonController.getLessonById);
lessonRoutes.put("/:id", updateLessonValidator(),
validate,lessonController.updateLessonById);
lessonRoutes.delete("/:id", deleteLessonValidator,validate,lessonController.deleteLessonById);

module.exports = lessonRoutes;
