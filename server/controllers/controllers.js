const Models = require('../models/testModel');

//error gen
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `controllers.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in controllers.${method}. Check server logs for more details.` }
  };
};


//controllers
const controllers = {};

controllers.testPost = (req, res, next) => {
  console.log('testPost req.body: ', req.body)
  const newTest = Object.assign({}, req.body)
  Models.create(newTest)
    .then(newTest => {
      res.locals.newTest = newTest;
      return next();
    })
};

module.exports = controllers;