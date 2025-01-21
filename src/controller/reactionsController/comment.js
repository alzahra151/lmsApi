const { Op } = require("sequelize")
const ApiResponser = require("../../helpers/apiResponser")
const db = require("../../models")

async function addComment(req, res, next) {
    console.log(req.user)
    const commentData = req.body
    const userId = req.user.id
    commentData.user_id = userId
    // commentData.user_id = 43

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
            where: {
                lesson_id: lessonId,
                comment_id: null
            },

            include: [
                {
                    model: db.Comment,
                    as: 'replies',
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            exclude: ['password']
                        }
                    ]
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
async function addReplay(req, res, next) {

    try {
        // const { body, user_id, lesson_id } = req.body;
        const commentData = req.body
        const { commentId } = req.params;
        console.log(commentId)
        const userId = req.user.id

        commentData.user_id = userId
        // commentData.user_id = 43
        commentData.comment_id = commentId
        console.log()
        const newReply = await db.Comment.create(commentData
            // {
            // body,
            // user_id,
            // lesson_id,
            // comment_id: commentId
            // }
        );
        res.json(newReply);
    } catch (error) {
        res.status(500).json(error);
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
        return new ApiResponser(res, req.t("sucessDelete"))
    } catch (err) {
        next(err)
    }
}
module.exports = {
    addComment,
    getLessonComments,
    getCommentReplies,
    deleteComment,
    addReplay

}