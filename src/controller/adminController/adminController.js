const db = require("../../models");
const ApiResponser = require("../../helpers/apiResponser");

async function getAllcourses(req, res, next) {
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
            //   include: [
            //     {
            //       model: db.Attachment,
            //       as: "attachments",
            //     },
            //     {
            //       model: db.Comment,
            //       as: "comments",
            //       include: [
            //         {
            //           model: db.Comment,
            //           as: "comment",
            //         },
            //       ],
            //     },
            //   ],
          },
          {
            model: db.Rate,
            as: "rates",
          },
        ],
        attributes: {
          include: [
            [
              db.Sequelize.fn("SUM", db.Sequelize.col("lessons.duration")),
              "duration",
            ],
            [
              db.Sequelize.fn("AVG", db.Sequelize.col("rates.rating")),
              "rating",
            ],
            // [
            //   db.Sequelize.fn("COUNT", db.Sequelize.col("rates.course_id")),
            //   "rates",
            // ],
          ],
          exclude: ["lessons"],
        },
      },
      { raw: true }
    );
    // res.json({ courses });
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
    return new ApiResponser(res, course)
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getAllcourses,
  getCourseById

};
