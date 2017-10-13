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
  Employee.findAll(  //switched to findAll because it was the only kind of operator I could find in the docs to run a function to get stuff from a join table
    { 
      include: [{ 
        all: true //you can also include individual tables, but because of the join table in between, this include all will allow us to have access to an object with every related property
      }],
      where: {
        id: req.params.id //this where statement takes the place of the effect of "getById"
      }
  }) 
  .then( (employee) => {
      let emp = employee[0].dataValues;
      res.render('employee', {
        emp,
        Trainings: emp.Trainings, //Trainings is a property of this object - nested, same for Copmuters
        Computers: emp.Computers
      });
  })
  .catch( (err) => {
    next(err); 
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