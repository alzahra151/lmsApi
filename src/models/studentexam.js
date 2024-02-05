"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentExam.belongsTo(models.Exam, { foreignKey: "exam_id", as: "exam" });
      StudentExam.belongsTo(models.User, {
        foreignKey: "student_id",
        as: "student",
      });
      StudentExam.belongsTo(models.User, {
        foreignKey: "teacher_id",
        as: "teacher",
      });
      StudentExam.hasMany(models.StudentExamQuestions, {
        foreignKey: "exam_id",
        as: "questions",
      });
    }
  }
  StudentExam.init(
    {
      exam_id: DataTypes.INTEGER,
      degree: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      student_id: DataTypes.INTEGER,
      teacher_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("completed", "paused", "started"),
        defaultValue: "started",
      },
      started_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      ended_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "StudentExam",
    }
  );
  return StudentExam;
};
