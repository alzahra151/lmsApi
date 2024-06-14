"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
      });
      Lesson.hasMany(models.Comment, {
        as: "comments",
        foreignKey: "lesson_id",
      });
      Lesson.hasMany(models.Attachment, {
        as: "attachments",
        foreignKey: "lesson_id",
      });
      // Lesson.hasMany(models.Exam, {
      //   as: "exams",
      //   foreignKey: "lesson_id",
      // });
      Lesson.belongsToMany(models.Exam, {
        through: { model: models.ExamLesson },
        as: "exams",
        foreignKey: "lesson_id",
      });
    }
  }
  Lesson.init(
    {
      title: DataTypes.STRING,
      alt_title: DataTypes.STRING,
      description: DataTypes.TEXT,
      alt_description: DataTypes.TEXT,
      course_id: DataTypes.INTEGER,
      video_url: DataTypes.TEXT,
      duration: DataTypes.INTEGER,
      is_free: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
