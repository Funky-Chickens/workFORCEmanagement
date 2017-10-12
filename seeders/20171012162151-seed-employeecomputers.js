'use strict';

let { employeeComputers } = require('./data/employeeComputers')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EmployeeComputers', employeeComputers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EmployeeComputers', null, {});
  }
};