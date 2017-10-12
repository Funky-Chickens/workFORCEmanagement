'use strict';

module.exports.getEmployees = (req, res, next) => {
  const { Employee } = req.app.get('models');
  const { Department } = req.app.get('models'); //require this in order to include it below
  Employee.findAll({include: [Department]}) //include Department and it becomes a property on the incoming GET
    .then( (employees) => {
      let emps = employees.map( (emps) => {
        return emps.dataValues;
      });
      res.render('employees', {emps});  //in PUG you just take it one dot further (emps.Department.whateverPropertyYouWanted)
  })
  .catch( (err) => {
    next(err); 
  });
};


module.exports.getSingleEmployee = (req, res, next) => {
  const { Employee } = req.app.get('models');  
  const { EmployeeComputers } = req.app.get('models');  
  const { Computer } = req.app.get('models');  
  Employee.findAll(
    { 
      include: [{ 
        all: true 
      }],
      where: {
        id: req.params.id
      }
  }) 
  .then( (employee) => {
      let emp = employee[0].dataValues;
      console.log("THE EMPR!!!!!", emp.Trainings[0].dataValues.name);
      res.render('employee', {
        emp,
        Trainings: emp.Trainings
      });
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};


module.exports.postEmployee = (req, res, next) => {
  const { Employee } = req.app.get('models');
  Employee.create({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    dept_id: req.body.dept_id,
    hire_date:req.body.hire_date,
    createdAt:null,
    updatedAt:null
  })
  .then( (result) => {
     res.status(200).json(result)
  })
  .catch( (err) => {
     res.status(500).json(err)
  })
}

