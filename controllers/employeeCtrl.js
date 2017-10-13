'use strict';

// CHRIS WAS HERE BIATCH

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
      res.render('employee', {
        emp,
        Trainings: emp.Trainings,
        Computers: emp.Computers
      });
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};


module.exports.putEmployee = (req, res, next) => {
  const { Employee } = req.app.get('models');
  Employee.update({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    dept_id: req.body.deptId
  }, {where:{id: req.params.id}}).then(function(employee){
    res.status(200).send();
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
   res.status(200).redirect('/employees/create');
  })
  .catch( (err) => {
     res.status(500).json(err)
  })
}

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

module.exports.renderCreateEmpPage = (req, res, next) =>{
  const { Department } = req.app.get('models');//require in department model
  Department.findAll()  //find all departments
  .then( (departments) => {
    let depts = departments.map( (dept) => {//map over departments and return the data values
      return dept.dataValues;
    });
    res.render('employees-create', {depts});//render the employees create page with dropdown populated dynamically
  })
  .catch( (err) => {
    next(err);
  });
};


