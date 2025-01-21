const db = require("../../models");
const ApiError = require("../../helpers/apiError")
const ApiResponser = require("../../helpers/apiResponser");


async function getAllCourses(req, res, next) {
  try {
    const courses = await db.Course.findAll(
      {
        attributes: [
          'id',
          'title',
          // 'description',
          // // 'alt_description',
          // 'start_date',
          // 'end_date',
          'is_free',
          'price',
          'discount',
          // 'discount_type',
          // 'status',
          'poster',
          'total',
          // [db.Sequelize.fn('SUM', db.Sequelize.col('lessons.duration')), 'totalDuration'],
          [db.Sequelize.literal(`(SELECT SUM(duration) FROM lessons WHERE lessons.course_id = Course.id)`), 'totalDuration'],
          [db.Sequelize.literal(`(SELECT AVG(rating) FROM rates WHERE rates.course_id = Course.id)`), 'averageRating']
          // [db.Sequelize.fn('AVG', db.Sequelize.col('rates.rating')), 'averageRating'],
        ],
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
            attributes: ['id', 'duration'],
            include: [
              {
                model: db.Attachment,
                as: "attachments",
                attributes: ['id', 'file']
              },
              // {
              //   model: db.Comment,
              //   as: "comments",
              //   include: [
              //     {
              //       model: db.Comment,
              //       as: "comment",
              //     },
              //   ],
              // },
            ],
          },
          {
            model: db.Rate,
            as: "rates",
            attributes: ['id', 'rating']
          },
          {
            model: db.Enrollment,
            as: "enrollments",
            attributes: ['id', 'student_id', 'status'], // Include relevant fields
            where: {
              status: "pending"
            },
            required: false,
          }
        ],

        group: ['Course.id', 'lessons.id', 'rates.id', 'lessons.attachments.id', 'enrollments.id'], // Group by id and title
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
  // console.log(req.user)
  const studentId = req.user.id
  // console.log()
  // console.log(courseId)
  try {
    // Check if the student is enrolled
    const Enrolled = await db.Enrollment.findOne({
      where: { course_id: courseId, student_id: studentId, status:"approved" },
    });
   
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
    console.log(Enrolled)

    res.status(200).json({
      result: {
        course,
        isEnrolled: !!Enrolled,  // Explicitly convert to true or false
     } ,
     
    });
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
