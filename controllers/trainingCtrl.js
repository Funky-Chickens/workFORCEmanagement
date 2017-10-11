'use strict'

module.exports.getTrainings = (req, res, next) => {
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