'use strict';

module.exports.getDepartments = (req, res, next) => {
  const { Department } = req.app.get('models');
  const { Employee } = req.app.get('models');  
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

module.exports.getSingleDepartment = (req, res, next) => {
  const { Department } = req.app.get('models');
  const { Employee } = req.app.get('models');
  let dept, supervisor, underlings; 
  Department.findAll({
      where: {
        id: req.params.id //this where statement takes the place of the effect of "getById"
      }
  }) 
  .then( (department) => {
      dept = department[0].dataValues;
      return Employee.findById(dept.supervisor_id)
  .then( (employee) => {
      supervisor = employee.dataValues
      return Employee.findAll({
        where: {
          dept_id: req.params.id
        }
      })
  .then( (employees) => {
      underlings = employees.map( (employee) => {
        return employee.dataValues
      })
      .filter( (employee) => {
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
    });
  })
  .catch( (err) => {
    next(err); 
  });
};