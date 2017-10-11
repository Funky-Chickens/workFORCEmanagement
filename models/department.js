'use strict';
module.exports = (sequelize, DataTypes) => {
  var Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    supervisor_id: DataTypes.INTEGER,
    budget: DataTypes.INTEGER
  });
  
  Department.classMethods = {
      associate: function(models) {
        belongsTo(models.Employee, { 
          foreignKey: 'supervisor_id',
          as: "Supervisor" });
        hasMany(models.Employee, {
          foreignKey: 'dept_id'
        });
      }
    }
  return Department;
};