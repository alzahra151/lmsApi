"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StudentExams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      exam_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Exam",
          key: "id",
        },
      },
      degree: {
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("completed", "paused", "started"),
        defaultValue: "started",
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
    await queryInterface.dropTable("StudentExams");
  },
};
