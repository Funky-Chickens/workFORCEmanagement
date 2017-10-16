'use strict';

//gets all computers
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

//gets a single computer by ID
module.exports.getOneComputer = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findAll(
    {
      include: [{
        all: true
      }],
      where: {
        id: req.params.id
      }
    })
  .then( (computer) => {
    let comp = computer[0].dataValues
    res.render('computer', {comp,
      Employees: comp.Employees});
  })
  .catch( (err) => {
    res.status(500).json({"error": err})
  });
};

//removes a computer
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

module.exports.postComputer = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.create({
    manufacturer:req.body.manufacturer,
    make:req.body.make,
    purchase_date: req.body.purchase_date
  })
  .then( (result) => {
    res.status(200).redirect('/computers');
  })
  .catch( (err) => {
     res.status(500).json(err)
  })
}


