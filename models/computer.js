'use strict';

module.exports = function(sequelize, DataTypes) {
  var Computer = sequelize.define('Computer', {
    manufacturer: DataTypes.STRING,
    make: DataTypes.STRING,
    purchase_date: DataTypes.DATEONLY
  }, {timestamps: false});

  Computer.associate = (models) => {
    // associate with users in a join table. Each row will contain a computer id, employee id, date assigned, and date returned
    Computer.belongsToMany(models.Employee, {
      through: 'EmployeeComputers',
      foreignKey: 'computer_id'
    })
  };

  return Computer;
};
