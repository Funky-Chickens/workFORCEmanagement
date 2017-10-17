'use strict';

module.exports.getSingleEmployee = (req, res, next) => {
  let possibles = [];
  const { Employee, Training } = req.app.get('models');  
  Training.findAll()
  .then( (trainings) => {
    possibles = trainings.map( (training) => {
      return training.dataValues;
    })
  });
  if (req.params.id !== 'popper.js.map') {
    // Employee.findById(req.params.id)
    // .then((foundEmp) => {
    //   foundEmp.getTrainings()
    //   .then( (trainings) => {
    //     let employeeProgs = trainings.map( (training) => {
    //       return training.dataValues
    //     });
    //     console.log("trainings", employeeProgs);
    //   })
    // })
    Employee.findAll(  //switched to findAll because it was the only kind of operator I could find in the docs to run a function to get stuff from a join table
      { 
        include: [{ 
          all: true //you can also include individual tables, but because of the join table in between, this include all will allow us to have access to an object with every related property
        }],
        where: {
          id: req.params.id //this where statement takes the place of the effect of "findById"
        }
    }) 
    .then( (employee) => {
      let emp = employee[0].dataValues;
      res.render('employee', {
        emp,
        PossibleTrainings: possibles,
        Computers: emp.Computers,//send Computer property to employee.pug for reassigning computers
        Trainings: emp.Trainings //Trainings is a property of this object - nested, same for Computers
      });
    })
    .catch( (err) => {
      next(err);
    });
  } else {
    console.log("Error!", req.params.id);
  }
};


module.exports.getEmployees = (req, res, next) => {
  const { Employee, Department } = req.app.get('models');
  Employee.findAll({include: [Department]}) //include Department and it becomes a property on the incoming GET -el
    .then( (employees) => {
      let emps = employees.map( (emps) => {
        return emps.dataValues;
      }).sort(function(a, b) { //orders the employees by their ID -jmr
        return parseFloat(a.id) - parseFloat(b.id);
    });
      res.render('employees', {emps});
  })
  .catch( (err) => {
    next(err); 
  });
};
    
    //this function will take in the two IDs from the route params and then remove the association in the join table(magicmethod)
module.exports.removeAssociationTraining = (req, res, next) => {
  const { Employee, Training } = req.app.get('models');  
  Employee.findById(parseInt(req.params.emp_id))
  .then( (foundEmp) => {
    return foundEmp.removeTrainings(req.params.train_id)
    .then( (yay) => {
      res.status(200).redirect(`/employees/${req.params.id}`);
    })
    .catch( (err) => {
      res.status(500).json(err);
    });
  })
  .catch( (error)=>{
    res.status(500).json(err);
  });
};


//updates employee information -jmr
module.exports.putEmployee = (req, res, next) => {
  let body = req.body;
  let empId = req.params.id;
  const { Employee, Computer } = req.app.get('models');
  Employee.findById(empId)
  .then( (foundEmp) => {
    return foundEmp.addTraining(body['training-id'])
  })// pass in the value of the selected drop down item
  .then( (yay) => {
    return Employee.update({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      dept_id: req.body.deptId
    }, {where:{id: empId}})
  })
  .then( (emp) => {
    console.log("comp id?", body.compId);
    //get all employees'computer information, check it against entered number- if it's already assigned to an employee, do an alert & don't change, else
    return Computer.findById(body.compId)
  })
  .then((foundComp) => {
    console.log("FOUND comp?", foundComp)
    if(foundComp){
      return foundComp.getEmployees()
      .then( (employees) => {
        if (!employees[0]){//if there's not person already assigned to that computer, do it
          return Employee.findById(empId)
        .then( (emp) =>{
          return emp.setComputers(body.compId)
        })
        .then( (data)=>{
          console.log("never break the chain...", data);
        })
        // .then(function(employee){
        //     //this goes to the second callback in the route, which is getSingleEmployee
        // })
        .catch( (err) => {
          next(err);
        });
        }else{
          console.log("Sorry, that computer doesn't exist");
        }
      })
      // .then( function(result){
      //   next();
      // })
      .catch((err)=>{
        next(err)
      })
    }
  })
  .then(function(){
    next();
  })
  .catch((err)=>{
    next(err)
  })
}

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