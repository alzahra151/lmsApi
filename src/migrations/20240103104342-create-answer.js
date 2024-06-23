"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Question",
          key: "id",
          allowNull: false,
        },
      },
      exam_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Exam",
          key: "id",
          allowNull: false,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Answers");
  },
};
