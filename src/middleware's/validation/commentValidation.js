const { body, validationResult } = require("express-validator")

const addCommentValidation = () => {
    return [
        body("body").notEmpty().isLength({ min: 3 }).withMessage((value, req) => {
            return req.path("commentValidateMsg")
        })
    ]
}
module.exports = {
    addCommentValidation
}