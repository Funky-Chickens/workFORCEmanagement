'use strict'

module.exports.getEmployees = (req, res, next) => {
  // console.log("models?", models);
  const { Employee } = req.app.get('models');
  const { Department } = req.app.get('models');
  Employee.findAll({include: [Department]}) 
    .then( (employees) => {
      console.log("employees", employees);
      let emps = employees.map( (emps) => {
        // emps.deptName = ;
        return emps.dataValues;
      });
      res.render('employees', {emps});
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};


module.exports.getSingleEmployee = (req, res, next) => {
  const { Employee } = req.app.get('models');
  Employee.findById(req.params.id) // love those built-in Sequelize methods
    .then( (employee) => {
      let emp = employee.dataValues;
      res.render('employee', {emp});
      
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};