const db = require('../../models')
const ApiError = require("../../helpers/apiError")
const ApiResponser = require("../../helpers/apiResponser")

async function getClasses(req, res, next) {
    try {
        const classes = await db.Class.findAll()
        return new ApiResponser(res, { classes })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getClasses
}