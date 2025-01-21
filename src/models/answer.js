"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Question, {
        foreignKey: "question_id",
        as: "question",
      });
      Answer.belongsTo(models.Exam, { foreignKey: "exam_id", as: "exam" });
      Answer.hasMany(models.StudentExamQuestions, {
        foreignKey: "answer_id",
      });
    }
  }
  Answer.init(
    {
      title: DataTypes.TEXT('long'),
      is_correct: DataTypes.BOOLEAN,
      question_id: DataTypes.INTEGER,
      exam_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
