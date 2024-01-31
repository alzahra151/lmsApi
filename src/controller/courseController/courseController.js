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
      }
    );
    return new ApiResponser(res,  courses )
  } catch (error) {
    next(error);
  }
}

async function getCourseById(req, res, next) {
  const courseId = req.params.id;

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
    return new ApiResponser(res,  course )
  } catch (error) {
    next(error);
  }
}

async function addCourse(res, res, next) {

  try {
    const course = await db.Course.create(req.body);
    return new ApiResponser(res,  course )
  } catch (error) {
    next(error);
  }
}
async function updateCourseById(req, res, next) {
  const courseId = req.params.id;

  try {
    const course = await db.Course.findByPk(courseId);
    await course.update(req.body);
    return new ApiResponser(res,  course )
  } catch (error) {
    next(error);
  }
}
async function deleteCousreById(req, res, next) {
  const courseId = req.params.id;

  try {
    const course = await db.Course.findByPk(courseId);
    await course.destroy();
    return new ApiResponser(res,  course )
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
