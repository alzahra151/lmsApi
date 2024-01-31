
const ApiResponser = require("../../helpers/apiResponser")
const db = require("../../models")
const ApiError = require("../../helpers/apiError")

async function addEnrollment(req, res, next) {
    const data = req.body
    try {
        const newRollment = await db.Enrollment.create(data)
        return new ApiResponser(res, { newRollment })
    } catch (error) {
        next(error)
    }
}

async function getEnrollements(req, res, next) {
    try {
        const enrollments = await db.Enrollment.findAll(
            {
                include: [
                    {
                        model: db.Course,
                        as: "course",
                        include: [
                            {
                                model: db.User,
                                as: "teacher",
                                attributes: {
                                    exclude: ["password", "class_id"],
                                },
                            }
                        ]
                    },
                    {
                        model: db.User,
                        as: "student",
                        attributes: {
                            exclude: ["password"],
                        },
                    },
                ]
            }
        )
        return new ApiResponser(res, { enrollments })
    } catch (err) {
        next(err)
    }
}
async function updateEnrollment(req, res, next) {
    const id = req.params.id
    const data = req.body
    try {
        const [updatedRowscount, updatedRows] = await db.Enrollment.update(data, { where: { id: id } })
        if (updatedRowscount == 0) throw new ApiError("Enrollment not found", 404)
        return new ApiResponser(res, { updatedRowscount })
    } catch (error) {
        next(error)
    }
}

async function getCourseEnrollments(req, res, next) {
    const courseId = req.params.id
    try {
        const enrollments = await db.Enrollment.findAll({
            where: { course_id: courseId },

            include: [
                {
                    model: db.Course,
                    as: "course",
                },
                {
                    model: db.User,
                    as: "student",
                    attributes: {
                        exclude: ["password"],
                    },
                },
            ]
        }
        )
        return new ApiResponser(res, { enrollments })
    } catch (err) {
        next(err)
    }
}
async function deleteEnrollment(req, res, next) {
    const id = req.params.id
    try {
        const deletedEnrollment = await db.Enrollment.findOne({ where: { id: id } })
        await deletedEnrollment.destroy()
        return ApiResponser(res, "Enrollment deleted successfully")
    } catch (err) {
        next(err)
    }
}
module.exports = {
    addEnrollment,
    getEnrollements,
    updateEnrollment,
    getCourseEnrollments,
    deleteEnrollment
}