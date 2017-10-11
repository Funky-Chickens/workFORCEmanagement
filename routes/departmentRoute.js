'use strict';

const { Router } = require('express');
const router = Router();

const { getDepartments, postDepartment, renderDeptCreatePage, getSingleDepartment } = require('../controllers/departmentCtrl');

//DEPARTMENTS
router.get('/departments', getDepartments);
  
// router.post('/departments', postDepartment);
  
// //SINGLE DEPARTMENT
// router.get('/departments/:id', getSingleDepartment);

// //DEPARTMENT FORM
// router.get('/departments/create', renderDeptCreatePage);

module.exports = router;
