"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Enrollments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Course",
          key: "id",
        },
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_free: {
        type: Sequelize.BOOLEAN,
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      discount_type: {
        type: Sequelize.ENUM("percentage", "fixed"),
        defaultValue: "fixed",
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Enrollments");
  },
};
