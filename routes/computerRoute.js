'use strict';

const { Router } = require('express');
const router = Router();

const { getComputers, postComputer, getOneComputer, deleteComputer } = require('../controllers/computerCtrl');

//COMPUTERS
router.get('/computers', getComputers);

// router.post('/computers', postComputer);

// //SINGLE COMPUTER
router.get('/computers/:id', getOneComputer);

// router.delete('/computers/:id', deleteComputer);

module.exports = router;
