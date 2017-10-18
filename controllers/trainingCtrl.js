'use strict'

//get all training programs -gm
module.exports.getTrainings = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.findAll() 
  .then( (trainings) => {
    let progs = trainings.map( (prog) => {
      return prog.dataValues;
    });
    res.render('training-progs', {progs});
  })
  .catch( (err) => {
    next(err);
  });
};

//removes a training program -cr
module.exports.deleteTraining = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((result) => {
    res.redirect('/training');
  })
}

// gets one training program by ID
module.exports.getSingleTrainingProgram = (req, res, next)=>{
  const { Training } = req.app.get('models');
  Training.findAll({
      include: [{
        all: true
      }],
      where: {
        id: req.params.id
      }
  })
  .then( (oneTraining) =>{
    let oneT = oneTraining[0].dataValues;
    res.render('training-prog', {oneT,
      Employees: oneT.Employees});
  })
  .catch( (err) => {
    next(err);
  });
};

//creates a new training program
module.exports.postTrainingPrograms = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.create({
    name:req.body.name,
    start_date:req.body.start_date,
    end_date:req.body.end_date,
    max_attendees: req.body.max_attendees,
    createdAt:null,
    updatedAt:null
  })
  .then( (result) => {
     res.status(200).redirect('/training');
  })
  .catch( (err) => {
     res.status(500).json(err)
  })
}

//updates a training program
module.exports.putTraining = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.update({
    name: req.body.name,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    max_attendees: req.body.maxAttendees
  }, {where:{id: req.params.id}}).then(function(training){
    res.status(200).send();
  })
  .catch( (err) => {
    next(err);
  });
};

//renders the training create page with a form
module.exports.renderTrainingCreatePage = (req, res, next) =>{
  res.render('training-create', {});
}