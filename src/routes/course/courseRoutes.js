const { Router } = require("express");
const courseRoutes = Router();
const courseController = require("../../controller/courseController/courseController");
const { addCourseValidator, updateCourseValidator, deleteCousreValidator , validate } = require("../../middleware's/validation/cousreValidation");

courseRoutes.get("/", courseController.getAllCourses);
courseRoutes.post("/", addCourseValidator(),validate, courseController.addCourse);
courseRoutes.get("/:id", courseController.getCourseById);
courseRoutes.put("/:id", updateCourseValidator(), validate, courseController.updateCourseById);
courseRoutes.delete("/:id", deleteCousreValidator(), validate, courseController.deleteCousreById);

module.exports = courseRoutes;
