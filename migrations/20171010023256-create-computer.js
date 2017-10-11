'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Computers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      make: {
        type: Sequelize.STRING
      },
      purchase_date: {
        type: Sequelize.DATEONLY
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Computers');
  }
};
