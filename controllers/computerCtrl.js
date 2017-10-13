'use strict';

module.exports.getComputers = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findAll() // love those built-in Sequelize methods
  .then( (computers) => {
    let comps = computers.map( (comp) => {
      return comp.dataValues;
    });
    res.render('computers', {comps});
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};

module.exports.renderCompCreatePage = (req, res, next) =>{
  res.render('computer-create', {});
}

module.exports.getOneComputer = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findById(req.params.id)
  .then( (computer) => {
    let comp = computer.dataValues
    res.render('computer', {comp});
  })
  .catch( (err) => {
    res.status(500).json({"error": err})
  });
};

module.exports.deleteComputer = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((result) => {
    res.redirect('/computers');
  })
}


