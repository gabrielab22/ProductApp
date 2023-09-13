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
        },
        {
          name: "Xaomi",
          country: "China",
          birth: "2010",
          employee: 8000,
        },
        {
          name: "Huawei",
          country: "China",
          birth: "1987",
          employee: 10000,
        },
        {
          name: "Nokia",
          country: "Finska",
          birth: "1865",
          employee: 8000,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Company", null, {});
  },
};
