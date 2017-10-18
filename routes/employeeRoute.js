'use strict';

const { Router } = require('express');
const router = Router();

const { removeAssociationTraining, getEmployees, renderCreateEmpPage, putEmployee, postEmployee, getSingleEmployee, updateEmployee } = require('../controllers/employeeCtrl');


//EMPLOYEES
router.get('/employees', getEmployees);

// //EMPLOYEE FORM - should patch navigate to the form as well??

router.get('/employees/create', renderCreateEmpPage);

// //SINGLE EMPLOYEE
router.get('/employees/:id', getSingleEmployee);

router.put('/employees/:id', putEmployee, getSingleEmployee); //two functions in the route, get to the second with "next()"

router.post('/employees', postEmployee);

//new route to delete only the relationship between an employee and the training program they are signed up for -el
router.delete('/employee_training/:emp_id/:train_id', removeAssociationTraining);

// router.patch('/employees/:id', updateEmployee);



module.exports = router;

