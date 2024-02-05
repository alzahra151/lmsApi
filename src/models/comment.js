"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Comment, {
        foreignKey: "comment_id",
        as: "comment",
        onDelete: 'CASCADE'
      });
      Comment.belongsTo(models.User, { foreignKey: "user_id", as: "user", onDelete: 'CASCADE' });
      Comment.belongsTo(models.Lesson, {
        foreignKey: "lesson_id",
        as: "lesson",
        onDelete: 'CASCADE'
      });
      Comment.hasMany(models.Comment, {
        foreignKey: "comment_id",
        as: "replies",
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Comment.init(
    {
      body: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      lesson_id: DataTypes.INTEGER,
      comment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
