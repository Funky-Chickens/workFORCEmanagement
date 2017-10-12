'use strict';

const { Router } = require('express');
const router = Router();

const { getEmployees, renderCreateEmpPage, putEmployee, postEmployee, getSingleEmployee, updateEmployee } = require('../controllers/employeeCtrl');

//EMPLOYEES
router.get('/employees', getEmployees);


router.put('/employees/:id', putEmployee);

router.post('/employees', postEmployee);


// //SINGLE EMPLOYEE
router.get('/employees/:id', getSingleEmployee);


// router.patch('/employees/:id', updateEmployee);

// //EMPLOYEE FORM - should patch navigate to the form as well??
// router.get('/employees/create', renderCreateEmpPage);

module.exports = router;

