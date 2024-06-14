"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, { foreignKey: "role_id" });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      alt_name: DataTypes.STRING,
      permissions: {
        type: DataTypes.JSON,
        defaultValue: [],
      }
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  // Role.create({ name: "مدرس", alt_name: "teacher", permissions: ['add_user', 'add_course'] })
  // ["add_user", "delete_user", "update_user", "get_users", "get_all_cources", "delete_course"]
  // ["get_all_cources", "get_course", "get_exam", "start_exam", "correct_exam"]
  // ["add_course", "get_all_cources", "get_course", "get_teacher_cources", "get_course_exams"]
  // ["add_student", "delete_student", "update_student", "get_all_students", "get_all_cources", "get_course", "get_course_exams"]

  return Role;
};
