"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Company",
      [
        {
          name: "Samsung",
          country: "Korea",
          birth: "1997",
          employee: 5000,
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
        {
          name: "Xaomi",
          country: "China",
          birth: "2010",
          employee: 8000,
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
        {
          name: "Huawei",
          country: "China",
          birth: "1987",
          employee: 10000,
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
        {
          name: "Nokia",
          country: "Finska",
          birth: "1865",
          employee: 8000,
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Company", null, {});
  },
};
