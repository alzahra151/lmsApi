"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rate.belongsTo(models.User, {
        foreignKey: "teacher_id",
        as: "teacher",
      });
      Rate.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Rate.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
      });
    }
  }
  Rate.init(
    {
      user_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      teacher_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Rate",
    }
  );
  return Rate;
};
