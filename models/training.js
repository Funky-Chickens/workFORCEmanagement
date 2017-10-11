module.exports = function(sequelize, DataTypes) {
  var Training = sequelize.define('Training', {
    name: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    max_attendees:DataTypes.INTEGER
  }, {timestamps: false});

  Training.associate = (models) => {//associate with employee model through join table of EmployeeTrainings
    Training.belongsToMany(models.Employee, {
      through: 'EmployeeTrainings',
      foreignKey:'trainingId' //key on join table
    });
  };

  return Training;
};