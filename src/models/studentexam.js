'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentExam.init({
    exam_id: DataTypes.INTEGER,
    degree: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentExam',
  });
  return StudentExam;
};