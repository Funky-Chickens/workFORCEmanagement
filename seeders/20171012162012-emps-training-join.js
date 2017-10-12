'use strict';

const { employeeTrainings } = require('./data/employee-training');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EmployeeTrainings', employeeTrainings, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EmployeeTrainings', null, {});
  }
};
