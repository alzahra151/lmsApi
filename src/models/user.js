"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        as: "role", foreignKey: "role_id", targetKey: 'id',
        constraints: true,
        scope: {
          name: sequelize.col('user_type')
        }
      });
      User.belongsTo(models.Class, { as: "class", foreignKey: "class_id" });
      User.hasMany(models.Comment, { foreignKey: "user_id" });
      User.hasMany(
        models.Rate,
        { foreignKey: "user_id" },
        { onDelete: "CASCADE" }
      );
      User.hasMany(models.Rate, { foreignKey: "teacher_id" });
      User.hasMany(models.Course, { foreignKey: "teacher_id" });
      User.hasMany(models.OTP, { foreignKey: "user_id" });
      User.hasMany(models.Exam, { foreignKey: "teacher_id" });
      // User.hasMany(models.Exam, { foreignKey: "teacher_id" });
      User.hasMany(models.StudentExam, { foreignKey: "student_id" });
      User.hasMany(models.StudentExam, { foreignKey: "teacher_id" });
      User.hasMany(models.StudentExamQuestions, { foreignKey: "teacher_id" });
      User.hasMany(models.Enrollment, { foreignKey: "student_id" });
      User.hasMany(models.Enrollment, { foreignKey: "teacher_id" });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      user_type: DataTypes.ENUM("admin", "student", "teacher", "super_admin"),
      photo: DataTypes.TEXT,
      brief: DataTypes.STRING,
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role_id: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
      subject: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
      // timestamps: true, // This adds createdAt and updatedAt timestamps
      // // underscored: true,
    }
  );
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSaltSync(10, "a");
    user.password = bcrypt.hashSync(user.password, salt);
  });

  return User;
};
