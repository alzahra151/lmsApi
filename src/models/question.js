"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Exam, { foreignKey: "exam_id", as: "exam" });
      Question.hasMany(models.Answer, {
        foreignKey: "question_id",
        as: "answers",
      });
    }
  }
  Question.init(
    {
      title: DataTypes.TEXT('long'),
      alt_title: DataTypes.TEXT,
      degree: DataTypes.INTEGER,
      exam_id: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
