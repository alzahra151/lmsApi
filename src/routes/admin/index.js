const { Router } = require("express");
const db = require("../../models");
const adminRoutes = Router();

adminRoutes.route("/courses").get(async (req, res, next) => {
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
              db.Sequelize.fn("SUM", db.Sequelize.col("rates.rating")),
              "rating",
            ],
            [
              db.Sequelize.fn("COUNT", db.Sequelize.col("rates.course_id")),
              "rates",
            ],
          ],
          exclude: ["lessons"],
        },
      },
      { raw: true }
    );
    res.json({ courses });
  } catch (error) {
    next(error);
  }
});

adminRoutes.route("/users").get(async (req, res, next) => {
  try {
    const users = await db.User.findAll(
      {
        include: [
          {
            model: db.Class,
            as: "class",
          },
          {
            model: db.Role,
            as: "role",
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      },
      { raw: true }
    );
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

module.exports = adminRoutes;
