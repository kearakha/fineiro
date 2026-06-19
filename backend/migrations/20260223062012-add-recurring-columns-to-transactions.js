'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('expenses', 'isRecurring', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
    await queryInterface.addColumn('incomes', 'isRecurring', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('expenses', 'isRecurring');
    await queryInterface.removeColumn('incomes', 'isRecurring');
  }
};
