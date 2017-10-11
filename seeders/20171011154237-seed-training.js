'use strict';

let { trainings } = require('./data/trainings')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Trainings', trainings, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Trainings', null, {});
  }
};
