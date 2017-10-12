'use strict'

module.exports.getTrainings = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.findAll() // love those built-in Sequelize methods
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

module.exports.deleteTrainings = (req, res, next) => {
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

module.exports.getSingleTrainingProgram = (req, res, next)=>{
  const { Training } = req.app.get('models');
  Training.findById(req.params.id)
  .then( (oneTraining) =>{
    let oneT = oneTraining.dataValues;
    res.render('training-prog', {oneT});
  })
  .catch( (err) => {
    next(err);
  });
};

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
     res.status(200).json(result)
  })
  .catch( (err) => {
     res.status(500).json(err)
  })
}

module.exports.renderTrainingCreatePage = (req, res, next) =>{
  res.render('training-create', {});
}