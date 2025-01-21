
const ApiResponser = require("../../helpers/apiResponser")
const db = require("../../models")
const ApiError = require("../../helpers/apiError")
// const enrollment = require("../../models/enrollment")

async function addEnrollment(req, res, next) {
    // const data = req.body
    let {
        course_id,
        teacher_id,
        status,
    } = req.body
    const student_id = req.user.id
    console.log(student_id)
    try {
        const enrollment = await db.Enrollment.create({
            course_id,
            teacher_id,
            status,
            student_id
        })
        return new ApiResponser(res, { enrollment })
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

async function getCourseEnrollments(req, res, next) {
    const courseId = req.params.course_id
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
                    include: [
                        {
                            model: db.Class,
                            as:"class"
                        }

                    ]
                },
            ]
        }
        )
        res.status(200).json(enrollments)
    } catch (err) {
        next(err)
    }
}
async function getClassEnrollments(req, res, next) {
    const classId = req.params.class_id
    try {
        const enrollments = await db.Enrollment.findAll({

            include: [
                {
                    model: db.Course,
                    as: "course",
                    where: { class_id: classId },
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
        const deletedEnrollment = await db.Enrollment.findByPk(id)
        await deletedEnrollment.destroy()
        return ApiResponser(res, "Enrollment deleted successfully")
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
async function getStudentEnrollmentsStatus(req, res, next) {
    const student_id = req.user.id
    console.log(student_id)
    try {
        const enrollments = await db.Enrollment.findAll({
            where: {
                student_id
            },
            attributes: ['course_id']
        })
        const courseIds = enrollments.map(enrollment => enrollment.course_id);
        // return new ApiResponser(res, { courseIds })
        res.status(200).json(courseIds)
    } catch (error) {
        next(error)
    }
}
async function checkEnrollment(req, res, next) {
    const { course_id } = req.params
    const { id } = req.user
    try {
        const enrollment = await db.Enrollment.findOne({
            where: {
                student_id: id,
                course_id,
                status: "approved"
            },
        })
        console.log(enrollment)
        // return new ApiResponser(res, { courseIds })
        res.status(200).json(enrollment)
    } catch (error) {
        next(error)
    }
}
async function getstudentEnrollmentCourses(req,res,next) {
    const  studentId = req.user.id;
    console.log(studentId)

    try {
        const enrolledCourses = await db.Enrollment.findAll({
            where: { student_id: studentId, status: 'approved' }, // Only approved enrollments
            include: [
                {
                    model: db.Course,
                    as:"course"
                }
            ]
        });

        // const courses = enrolledCourses.map(enrollment => enrollment.Course);

        res.status(200).json(enrolledCourses);
    } catch (error) {
        next(error)
    }
}
module.exports = {
    addEnrollment,
    getEnrollements,
    updateEnrollment,
    getCourseEnrollments,
    deleteEnrollment,
    getStudentEnrollmentsStatus,
    checkEnrollment,
    getClassEnrollments,
    getstudentEnrollmentCourses
}