'use strict';

const hashPassword = require('../helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../db/users.json").map((e) => {
      e.createdAt = e.updatedAt = new Date()
      e.password = hashPassword(e.password)
      return e
    })
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
