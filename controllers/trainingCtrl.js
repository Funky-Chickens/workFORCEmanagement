'use strict'

module.exports.getTrainings = (req, res, next) => {
  const { Training } = req.app.get('models');
  Training.findAll() // love those built-in Sequelize methods
  .then( (trainings) => {
    res.render('index', {trainings});
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
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