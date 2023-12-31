"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentExamQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentExamQuestions.belongsTo(models.StudentExam, {
        foreignKey: "exam_id",
        as: "exam",
      });
      StudentExamQuestions.belongsTo(models.User, {
        foreignKey: "student_id",
        as: "student",
      });
      StudentExamQuestions.belongsTo(models.Question, {
        foreignKey: "question_id",
        as: "question",
      });
    }
  }
  StudentExamQuestions.init(
    {
      exam_id: DataTypes.INTEGER,
      degree: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      student_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      is_correct: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "StudentExamQuestions",
    }
  );
  return StudentExamQuestions;
};
