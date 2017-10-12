'use strict';

const { Router } = require('express');
const router = Router();

const { getComputers, postComputer, getOneComputer, deleteComputer } = require('../controllers/computerCtrl');

//COMPUTERS
router.get('/computers', getComputers);

// router.post('/computers', postComputer);

<<<<<<< HEAD
//SINGLE COMPUTER
// router.get('/computers/:id', getSingleComputer);
=======
// //SINGLE COMPUTER
router.get('/computers/:id', getOneComputer);
>>>>>>> master

// router.delete('/computers/:id', deleteComputer);

module.exports = router;
