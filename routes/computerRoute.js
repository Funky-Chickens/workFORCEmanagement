'use strict';

const { Router } = require('express');
const router = Router();

const { getComputers } = require('../controllers/computerCtrl');

// When the request is a GET on the computers route, call get Computers
router.get('/computers', getComputers);

module.exports = router;
