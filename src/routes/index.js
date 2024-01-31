const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();
const studentRoutes = require("./student/studentRoutes");
const userController = require("../controller/user")
const commentController = require("../controller/reactionsController/comment")
const rateController = require("../controller/reactionsController/rate")
const authorization = require("../middleware's/authorization");
const { loginValidator, validate } = require("../middleware's/validation/userValidation")

routes.use("/admin", adminRoutes);
routes.use("/", studentRoutes);
routes.route("/login").post(loginValidator(), validate, userController.login)
// comment routes
routes.route("/add-comment").post(authorization, commentController.addComment)
routes.route("/comments/:lesson_id").get(commentController.getLessonComments)
routes.route("/comment-replays").get(commentController.getCommentReplies)
routes.route("/comment/:comment_id").delete(authorization, commentController.deleteComment)
// rate routes
routes.route("/rates/:course_id").get(rateController.getCourseRates)

module.exports = routes;
