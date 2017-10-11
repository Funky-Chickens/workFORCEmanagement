'use strict'

module.exports.getComputers = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findAll() // love those built-in Sequelize methods
  .then( (computers) => {
    let comps = computers.map( (comp) => {
      return comp.dataValues;
    });
    console.log(comps);
    res.render('computers', comps);
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};
