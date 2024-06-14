"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exam.belongsTo(models.Course, { foreignKey: "course_id", as: "course" });
      // Exam.belongsTo(models.Lesson, { foreignKey: "lesson_id", as: "lesson" });
      Exam.belongsTo(models.Class, { foreignKey: "class_id", as: "class" });
      Exam.belongsTo(models.User, { foreignKey: "teacher_id", as: "teacher" });
      Exam.hasMany(models.Question, { foreignKey: "exam_id", as: "questions" });
      Exam.hasMany(models.Answer, { foreignKey: "exam_id" });
      Exam.belongsToMany(models.Lesson, {
        through: { model: models.ExamLesson },
        as: "lessons",
        foreignKey: "exam_id",
      });
    }
  }
  Exam.init(
    {
      title: DataTypes.STRING,
      alt_title: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      // lesson_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
      teacher_id: DataTypes.INTEGER,
      exam_type: {
        type: DataTypes.ENUM('mcq'),
        // values: ["mcq"],
        defaultValue: 'mcq',
      },
    },
    {
      sequelize,
      modelName: "Exam",
    }
  );
  return Exam;
};
