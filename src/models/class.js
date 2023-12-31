"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.hasMany(models.User, { foreignKey: "class_id" });
      Class.hasMany(models.Exam, { foreignKey: "class_id" });
    }
  }
  Class.init(
    {
      name: DataTypes.STRING,
      alt_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
