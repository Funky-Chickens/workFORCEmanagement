'use strict';

const { Router } = require('express');
const router = Router();

const { getTrainingPrograms, postTrainingPrograms, getSingleTrainingProgram, updateTrainingProgram, deleteTrainingProgram, renderTrainingCreatePage } = require('../controllers/trainingCtrl');

//TRAINING PROGRAMS
router.get('/training', getTrainingPrograms);

// router.post('/training', postTrainingPrograms);

// //SINGLE TRAINING PROGRAM
// router.get('/training/:id', getSingleTrainingProgram);

// router.patch('/training/:id', updateTrainingProgram);

// router.delete('/training/:id', deleteTrainingProgram);

// //TRAINING FORM - should patch navigate to the form as well??
// router.get('/training/create', renderTrainingCreatePage);

module.exports = router;
