'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dept_id: DataTypes.INTEGER,
    hire_date: DataTypes.STRING
  });

     Employee.associate = (models) => {
        Employee.belongsToMany(models.Training, {
          through: 'EmployeeTrainings',
          foreignKey: 'employee_id'
        });
        Employee.belongsTo(models.Department, { 
          foreignKey: 'dept_id' 
        });
        Employee.belongsToMany(models.Computer, {
          through: 'EmployeeComputers',
          foreignKey: 'employee_id'
        });
        
    };
  return Employee;
}