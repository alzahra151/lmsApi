const ApiResponser = require("../../helpers/apiResponser")
const db = require("../../models")

async function addRate(req, res, next) {
    const { course_id, rating, notes } = req.body
    console.log(req.user)
    const user_id = req.user.id
    try {
        const newRate = await db.Rate.create({
            course_id,
            rating,
            notes,
            user_id
        })
        return new ApiResponser(res, { newRate })

    } catch (error) {
        next(error)
    }
}
async function getCourseRates(req, res, next) {
    const courseId = req.params.course_id
    try {
        const rates = await db.Rate.findAll({
            where: { course_id: courseId },

            include: [
                {
                    model: db.Course,
                    as: 'course',
                },
                {
                    model: db.User,
                    as: 'user',
                    exclude: ['password']
                },

            ],
        }
        )
        return new ApiResponser(res, { rates })
    } catch (err) {
        next(err)
    }
}

async function updateRate(req, res, next) {
    const data = req.body
    const id = req.params.id
    try {
        const [updatedRowscount, updatedRows] = await db.Rate.update(data, { where: { id: id } })
        if (updatedRowscount == 0) throw new ApiError("Rate not found", 404)
        return new ApiResponser(res, { updatedRowscount })
    } catch (error) {
        next(error)
    }

}
module.exports = {
    getCourseRates,
    addRate,
    updateRate
}