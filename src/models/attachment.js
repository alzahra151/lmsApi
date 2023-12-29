"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attachment.belongsTo(models.Lesson, {
        foreignKey: "lesson_id",
        as: "lesson",
      });
    }
  }
  Attachment.init(
    {
      file: DataTypes.TEXT,
      file_type: DataTypes.STRING,
      file_size: DataTypes.INTEGER,
      lesson_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Attachment",
    }
  );
  return Attachment;
};
