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
        Computers: emp.Computers,
        removeTraining: removeAssociationTraining
      });
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};

let removeAssociationTraining = (employee_id, training_id) => {
  Employee.getById(employee_id)
  .then( (foundEmp) => {
    foundEmp.removeTrainings(training_id)
    .then( (yay) => {
      res.status(200);
    })
  })
}


module.exports.putEmployee = (req, res, next) => {
  let body = req.body;
  const { Employee } = req.app.get('models');  
  Employee.findById(req.params.id)
  .then( (foundEmp) => {
    foundEmp.setTrainings(req.body.trainingprogs)
    .then( (yay) => {
      res.status(200);
  })
})
  Employee.update({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    dept_id: req.body.deptId
  }, {where:{id: req.params.id}})
  .then(function(employee){
    res.status(200).redirect(`/employees/${req.params.id}`);
  })
  .catch( (err) => {
    next(err); 
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