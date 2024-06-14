const db = require('../../models')
const ApiError = require("../../helpers/apiError")
const ApiResponser = require("../../helpers/apiResponser")

async function addRole(req, res, next) {
    try {
        let {
            name,
            alt_name,
            permissions
        } = req.body
        const role = await db.Role.create({
            name,
            alt_name,
            permissions
        })
        return new ApiResponser(res, { role })
    } catch (error) {
        next(error)
    }
}
async function getRole(req, res, next) {
    const { id } = req.params
    try {
        const role = await db.Role.findByPk(id)
        return new ApiResponser(res, { role })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    addRole,
    getRole
}