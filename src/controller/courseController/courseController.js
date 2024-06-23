const db = require("../../models");
const ApiError = require("../../helpers/apiError")
const ApiResponser = require("../../helpers/apiResponser")
async function getAllCourses(req, res, next) {
  try {
    const courses = await db.Course.findAll(
      {
        include: [
          {
            model: db.User,
            as: "teacher",
            attributes: {
              exclude: ["password", "class_id"],
            },
          },
          {
            model: db.Lesson,
            as: "lessons",
            include: [
              {
                model: db.Attachment,
                as: "attachments",
              },
            ],
          },
          {
            model: db.Rate,
            as: "rates",
          },
        ],
        attributes: [
          'id', // include id in SELECT list
          'title', // include title in SELECT list
          [db.Sequelize.fn("SUM", db.Sequelize.col("lessons.duration")), "duration"],
          [db.Sequelize.fn("AVG", db.Sequelize.col("rates.rating")), "rating"],
        ],
        group: ['Course.id', 'Course.title'], // group by id and title
      },
      { raw: true }
    );
    // res.json({ courses });
    console.log(courses)
    return new ApiResponser(res, { courses })
  } catch (error) {
    next(error);
  }
}

async function getCourseById(req, res, next) {
  const courseId = req.params.id;
  console.log(courseId)
  try {
    const course = await db.Course.findByPk(courseId, {
      include: [
        {
          model: db.User,
          as: "teacher",
          attributes: {
            exclude: ["password", "class_id"],
          },
        },
        {
          model: db.Lesson,
          as: "lessons",
        },
        {
          model: db.Rate,
          as: "rates",
        },
      ],
      // attributes: {
      //   include: [
      //     [
      //       db.Sequelize.fn("SUM", db.Sequelize.col("lessons.duration")),
      //       "duration",
      //     ],
      //     [
      //       db.Sequelize.fn("SUM", db.Sequelize.col("rates.rating")),
      //       "rating",
      //     ],
      //     [
      //       db.Sequelize.fn("COUNT", db.Sequelize.col("rates.course_id")),
      //       "rates",
      //     ],
      //   ],
      //   exclude: ["lessons"],
      // },
    });
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    return new ApiResponser(res, { course })
  } catch (error) {
    next(error);
  }
}

async function addCourse(req, res, next) {
  const teacher_id = req.user.id
  const user = await db.User.findByPk(teacher_id);
  if (!user) throw new Error("Invalid teacher_id");

  console.log(req.user)
  const data = req.body
  data.teacher_id = teacher_id
  console.log(data.teacher_id)
  console.log(data)
  if (req.file) data.poster = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
  try {
    console.log(data)
    const course = await db.Course.create(data);
    return new ApiResponser(res, course)
  } catch (error) {
    next(error);
  }
}
async function updateCourseById(req, res, next) {
  const courseId = req.params.id;

  try {
    const course = await db.Course.findByPk(courseId);
    await course.update(req.body);
    return new ApiResponser(res, course)
  } catch (error) {
    next(error);
  }
}
async function deleteCousreById(req, res, next) {
  const courseId = req.params.id;

  try {
    const course = await db.Course.findByPk(courseId);
    await course.destroy();
    return new ApiResponser(res, course)
  } catch (error) {
    next(error);
  }
}



module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCousreById,
};
