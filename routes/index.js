'use strict';

const { Router } = require('express');
const router = Router();

//LANDING PAGE
router.get('/', (req, res, next) => {
  res.render('index');
});

// // pipe all other requests through the route modules
router.use(require('./computerRoute'));
router.use(require('./departmentRoute'));
router.use(require('./trainingRoute'));
router.use(require('./employeeRoute'));

module.exports = router;
