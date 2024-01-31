const { Op } = require("sequelize")
const ApiResponser = require("../../helpers/apiResponser")
const db = require("../../models")

async function addComment(req, res, next) {
    const commentData = req.body
    const userId = req.user.id

    commentData.user_id = userId
    try {
        const newComment = await db.Comment.create(commentData)
        return new ApiResponser(res, { newComment })
    } catch (err) {
        next(err)
    }
}
async function getLessonComments(req, res, next) {
    const lessonId = req.params.lesson_id
    try {
        const comments = await db.Comment.findAll({
            where: { lesson_id: lessonId },

            include: [
                {
                    model: db.Comment,
                    as: 'replies',
                },
                {
                    model: db.Lesson,
                    as: 'lesson',
                },
                {
                    model: db.User,
                    as: 'user',
                    exclude: ['password']
                }
            ]

        }
        )
        return new ApiResponser(res, { comments })
    } catch (err) {
        next(err)
    }
}
async function getCommentReplies(req, res, next) {
    const commentId = req.body.commentId
    try {
        const replies = await db.Comment.findAll({ where: { comment_id: commentId } })
        return new ApiResponser(res, { replies })
    } catch (err) {
        next(err)
    }
}
async function deleteComment(req, res, next) {
    const commentId = req.params.comment_id
    try {
        const deletedComment = await db.Comment.findOne({
            where: {
                id: commentId,
            }
        })
        await deletedComment.destroy()
        return new ApiResponser(res, "comment deleted successfully")
    } catch (err) {
        next(err)
    }
}
module.exports = {
    addComment,
    getLessonComments,
    getCommentReplies,
    deleteComment

}