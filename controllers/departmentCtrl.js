'use strict';

module.exports.getDepartments = (req, res, next) => {
  console.log('hello')
  const { Department } = req.app.get('models');
  Department.findAll()
  .then( (departments) => {
    console.log(departments)
    let depts = departments.map( (dept) => {
      console.log(dept);
      return dept.dataValues;
    });
    res.render('departments', {depts});
  })
  .catch( (err) => {
    next(err);
  });
};