'use strict';

const { Router } = require('express');
const router = Router();

const { getTrainings, postTrainingPrograms, getSingleTrainingProgram, updateTrainingProgram, deleteTraining, renderTrainingCreatePage } = require('../controllers/trainingCtrl');

//TRAINING PROGRAMS
router.get('/training', getTrainings);

//TRAINING FORM - should patch navigate to the form as well??
// router.get('/training/create', renderTrainingCreatePage);//has to go here so it doesn't conflict with training/:id route

router.post('/training', postTrainingPrograms);

// //SINGLE TRAINING PROGRAM
router.get('/training/:id', getSingleTrainingProgram);

// router.patch('/training/:id', updateTrainingProgram);

router.delete('/training/:id', deleteTraining);

module.exports = router;

