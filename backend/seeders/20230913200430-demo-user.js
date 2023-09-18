"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Gabriela",
          lastName: "Bilanzic",
          email: "gabriela@email.com",
          password: await bcrypt.hash("test123", 10),
          rola: "ADMIN",
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
