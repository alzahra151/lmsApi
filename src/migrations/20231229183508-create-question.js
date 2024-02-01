"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      alt_title: {
        type: Sequelize.TEXT,
      },
      degree: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      exam_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Exam",
          key: "id",
        },
      },
      answers: [
        {
          title: {
            type: Sequelize.STRING,
          },
          alt_title: {
            type: Sequelize.STRING,
          },
          is_correct: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
        },
      ],
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
    await queryInterface.dropTable("Questions");
  },
};
