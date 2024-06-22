"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.Lesson, { as: "lessons", foreignKey: "course_id" });
      Course.hasMany(models.Rate, { as: "rates", foreignKey: "course_id" });
      Course.hasMany(models.Exam, { as: "exams", foreignKey: "course_id" });
      Course.hasMany(models.Enrollment, { foreignKey: "course_id" });
      Course.belongsTo(models.User, {
        as: "teacher",
        foreignKey: "teacher_id",
      });
      // Course.hasOne(models.Class, { foreignKey: "class_id", as: "class" });
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      alt_title: DataTypes.STRING,
      description: DataTypes.TEXT,
      alt_description: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      is_free: DataTypes.BOOLEAN,
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,    // Allow NULL
        defaultValue: 0,    // Default to 0
      },
      discount: DataTypes.INTEGER,
      discount_type: DataTypes.ENUM("percentage", "fixed"),
      status: DataTypes.ENUM("pending", "active", "inactive", "rejected"),
      teacher_id: DataTypes.INTEGER,
      poster: DataTypes.STRING,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
