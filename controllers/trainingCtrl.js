'use strict'

module.exports.getTrainingPrograms = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.findAll() // love those built-in Sequelize methods
  .then( (trainings) => {
    let train= trainings.map( (program) =>{
      return program.dataValues; //yank out data values into new array
    });
    console.log(train)
    res.render('training-progs', train);//show the training programs pug view with this info.
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getSingleTrainingProgram = (req, res, next)=>{
  const { Training } = req.app.get('models');
  Training.findById(req.params.id)
  .then( (oneTraining) =>{
    res.render('training-prog', oneTraining.dataValues);
  })
  .catch( (err) => {
    next(err);
  });
};