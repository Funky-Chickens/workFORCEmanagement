'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeTrainings',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Employees',//plural required here for models
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      training_id:{//look at this in models under FK & check that it's formed correctly
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Trainings',//plural here too
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmployeeTrainings')
  }
};
