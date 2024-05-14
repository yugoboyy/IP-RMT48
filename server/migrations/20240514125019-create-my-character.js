'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MyCharacters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      constalation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      normalAttack: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      elementalSkill: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      elementalBurst: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MyCharacters');
  }
};