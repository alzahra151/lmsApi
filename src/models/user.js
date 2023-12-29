"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { as: "role", foreignKey: "role_id" });
      User.belongsTo(models.Class, { as: "class", foreignKey: "class_id" });
      User.hasMany(models.Comment);
      User.hasMany(models.Rate);
      User.hasMany(models.Course);
      User.hasMany(models.OTP);
      User.hasMany(models.Exam);
      User.hasMany(models.Course);
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      user_type: DataTypes.ENUM("admin", "student", "teacher", "admin_user"),
      photo: DataTypes.TEXT,
      mobile: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
