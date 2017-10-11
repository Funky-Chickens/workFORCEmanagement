'use strict'

module.exports.getDepartments = (req, res, next) => {
  const { Department } = req.app.get('models');
  Department.findAll() // love those built-in Sequelize methods
  .then( (departments) => {
    res.render('index', {departments});
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};