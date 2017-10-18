'use strict';

//gets a list of departments
module.exports.getDepartments = (req, res, next) => {
  const { Department } = req.app.get('models');
  let depts;
  Department.findAll()
  .then( (departments) => {
    depts = departments.map( (dept) => {
      return dept.dataValues;
    })
    res.render('departments', {depts});
  })
  .catch( (err) => {
    next(err);
  });
};

//gets a department by ID, its supervisor, and its employees
module.exports.getSingleDepartment = (req, res, next) => {
  const { Department, Employee } = req.app.get('models');
  let dept, supervisor, underlings; 
  Department.findById(req.params.id)
  .then( (department) => {
      dept = department.dataValues;
      return Employee.findById(dept.supervisor_id)
  })
  .then( (employee) => { //uses the supervisor id from the department and finds employee with associated ID -jmr
      supervisor = employee.dataValues
      return Employee.findAll({ //gets all employees from the department -jmr
        where: { dept_id: req.params.id }
      })
  })
  .then( (employees) => {
      underlings = employees.map( (employee) => {
        return employee.dataValues
      })
      .filter( (employee) => { //removes the supervisor from the employee list to be displayed -jmr
        if(employee.id !== dept.supervisor_id) {
          return employee;
        }
      })
      res.render('department', {
        dept,
        supervisor,
        underlings
      });
  })
  .catch( (err) => {
    next(err); 
  });
};