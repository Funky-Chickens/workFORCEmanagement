'use strict';

module.exports.getComputers = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findAll() 
  .then( (computers) => {
    let comps = computers.map( (comp) => {
      return comp.dataValues;
    });
    res.render('computers', {comps});
  })
  .catch( (err) => {
    next(err); 
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


