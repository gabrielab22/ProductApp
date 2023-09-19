"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Product",
      [
        {
          name: "Redmi Note 10",
          price: 4009,
          type: "smartphone",
          availability: 27,
          companyId: 2,
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
        {
          name: "Galaxy s23",
          price: 5004,
          type: "smartphone",
          availability: 21,
          companyId: 1,
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
        {
          name: "Galaxy A50",
          price: 3660,
          type: "smartphone",
          availability: 16,
          companyId: 1,
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
        {
          name: "Windows phone",
          price: 2000,
          type: "mobile phone-smartphone",
          availability: 21,
          companyId: 4,
          createdAt: "2021-10-17 15:40:10",
          updatedAt: "2021-10-17 15:40:10",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product", null, {});
  },
};
