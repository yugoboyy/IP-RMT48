'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../db/myCharacters.json").map((e) => {
      e.createdAt = e.updatedAt = new Date()
      return e
    })
    await queryInterface.bulkInsert('MyCharacters', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MyCharacters', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
