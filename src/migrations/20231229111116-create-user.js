"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      user_type: {
        type: Sequelize.ENUM("admin", "student", "teacher", "admin_user"),
      },
      photo: {
        type: Sequelize.TEXT,
      },
      mobile: {
        type: Sequelize.INTEGER,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Role",
          key: "id",
        },
      },
      class_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Class",
          key: "id",
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
    await queryInterface.dropTable("Users");
  },
};
