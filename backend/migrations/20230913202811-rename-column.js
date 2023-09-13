"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Company", "county", "country");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Company", "country", "county");
  },
};
