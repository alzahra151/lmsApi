
const { Router } = require("express");
const commentRoutes = Router();
const commentController = require("../../controller/reactionsController/comment")
const authorization = require("../../middleware's/authorization");

// comment routes
commentRoutes.route("/add").post(authorization, commentController.addComment)
commentRoutes.route("/add-replay/:commentId").post(authorization, commentController.addReplay)
commentRoutes.route("/:lesson_id").get(commentController.getLessonComments)
commentRoutes.route("/comment-replays").get(commentController.getCommentReplies)
commentRoutes.route("/comment/:comment_id").delete(authorization, commentController.deleteComment)

module.exports = commentRoutes