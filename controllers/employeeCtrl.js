'use strict';

//gets a list of employees and their departments -jmr
module.exports.getEmployees = (req, res, next) => {
  const { Employee, Department } = req.app.get('models');
  let orderedEmps = [];
  Employee.findAll({include: [Department]}) //include Department and it becomes a property on the incoming GET -el
    .then( (employees) => {
      let emps = employees.map( (emps) => {
        return emps.dataValues;
      })
      orderedEmps = emps.sort(function(a, b) { //orders the employees by their ID -jmr
        return parseFloat(a.id) - parseFloat(b.id);
    });
      res.render('employees', {orderedEmps});
  })
  .catch( (err) => {
    next(err); 
  });
};

//gets a single employee by their ID
module.exports.getSingleEmployee = (req, res, next) => {
  const { Employee } = req.app.get('models');  
  Employee.findAll({ 
      include: [{ 
        all: true //includes all associated tables -el
      }],
      where: {
        id: req.params.id //this where statement takes the place of the effect of "getById" -el
      }
  }) 
  .then( (employee) => {
      let emp = employee[0].dataValues;
      res.render('employee', {
        emp,
        Trainings: emp.Trainings, //Trainings is a property of this object - nested, same for Copmuters -el
        Computers: emp.Computers
      });
  })
  .catch( (err) => {
    next(err); 
  });
};

//updates employee information -jmr
module.exports.putEmployee = (req, res, next) => {
  const { Employee } = req.app.get('models');  
  Employee.update({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    dept_id: req.body.deptId
  }, { 
    where: {
      id: req.params.id
    }
  }).then(function(employee){
    res.status(201).send();
  })
  .catch( (err) => {
    next(err); 
  });
};

//adds new employee
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
    res.status(200).redirect('/employees');
  })
  .catch( (err) => {
     res.status(500).json(err)
  })
}

//pulls up the employee create form -gm
module.exports.renderCreateEmpPage = (req, res, next) =>{
    const { Department } = req.app.get('models');
    Department.findAll() //find all departments -gm
    .then( (departments) => {
      let depts = departments.map( (dept) => { //map over departments and return the data values -gm
        return dept.dataValues;
      });
      res.render('employees-create', {depts}); //render the employees create page with dropdown populated dynamically -gm
    })
    .catch( (err) => {
      next(err);
    });
  };