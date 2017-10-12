module.exports.getComputers = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findAll() // love those built-in Sequelize methods
  .then( (computers) => {
    let comps = computers.map( (comp) => {
      return comp.dataValues;
    });
<<<<<<< HEAD
    console.log(comps);
    res.render('computers', comps);
=======
    res.render('computers', {comps});
>>>>>>> master
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};

module.exports.getOneComputer = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findById(req.params.id)
  .then( (computer) => {
    // res.status(200).json(computer)
    let comp = computer.dataValues
    res.render('computer', {comp});
  })
  .catch( (err) => {
    res.status(500).json({"error": err})
  });
};
