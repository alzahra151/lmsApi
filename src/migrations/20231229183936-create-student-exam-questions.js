"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StudentExamQuestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      exam_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "StudentExam",
          key: "id",
        },
      },
      degree: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Question",
          key: "id",
        },
      },

      answer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Answer",
          key: "id",
        },
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("StudentExamQuestions");
  },
};
