'use strict';

let { computers } = require('./data/computers')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Computers', computers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Computers', null, {});
  }
};
