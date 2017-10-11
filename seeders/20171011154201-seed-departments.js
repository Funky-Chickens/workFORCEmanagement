'use strict';

const { departments } = require('./data/departments'); 

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Departments', departments, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Departments', null, {});
  }
};
