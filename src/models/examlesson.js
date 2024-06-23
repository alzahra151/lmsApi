"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamLesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExamLesson.init(
    {
      exam_id: DataTypes.INTEGER,
      lesson_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ExamLesson",
    }
  );
  return ExamLesson;
};
