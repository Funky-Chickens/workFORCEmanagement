'use strict';

module.exports.getDepartments = (req, res, next) => {
  const { Department } = req.app.get('models');
  Department.findAll()
  .then( (departments) => {
    let depts = departments.map( (dept) => {
      return dept.dataValues;
    });
    res.render('departments', {depts});
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getSingleDepartment = (req, res, next) => {
  const { Department } = req.app.get('models');
  const { Employee } = req.app.get('models');
  let dept, supervisor; 
  Department.findAll(  //switched to findAll because it was the only kind of operator I could find in the docs to run a function to get stuff from a join table
    { 
      include: [{ 
        all: true //you can also include individual tables, but because of the join table in between, this include all will allow us to have access to an object with every related property
      }],
      where: {
        id: req.params.id //this where statement takes the place of the effect of "getById"
      }
  }) 
  .then( (department) => {
      dept = department[0].dataValues;
      return Employee.findById(dept.supervisor_id)
  .then( (employee) => {
      supervisor = employee.dataValues
      console.log("department", dept)
      console.log("supervisor", supervisor)
      res.render('department', {
        dept,
        supervisor
      });
    });
  })
  .catch( (err) => {
    next(err); 
  });
};