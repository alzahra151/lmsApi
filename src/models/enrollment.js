"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enrollment.belongsTo(models.User, {
        foreignKey: "student_id",
        as: "student",
      });
      Enrollment.belongsTo(models.User, {
        foreignKey: "teacher_id",
        as: "teacher",
      });
      Enrollment.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
      });
    }
  }
  Enrollment.init(
    {
      student_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      teacher_id: DataTypes.INTEGER,
      status: DataTypes.ENUM("pending", "approved", "rejected"),
      price: DataTypes.INTEGER,
      is_free: DataTypes.BOOLEAN,
      discount: DataTypes.INTEGER,
      discount_type: DataTypes.ENUM("percentage", "fixed"),
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Enrollment",
    }
  );
  return Enrollment;
};
