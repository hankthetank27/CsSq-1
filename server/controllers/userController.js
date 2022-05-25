const userModel = require('../models/userModel');

//error gen
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `userController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
  };
};

//userController
const userController = {};

userController.createNewUser = (req, res, next) => {
  console.log('testPost req.body: ', req.body)
  const newUser = Object.assign({}, req.body)
  userModel.create(newUser)
    .then(newUser => {
      res.locals.newUser = newUser;
      return next();
    })
    .catch(err => next(createErr({
      method: 'createNewUser',
      type: 'when creating new user DB entry',
      err: err
    })));
};

userController.getUser = (req, res, next) => {
  const username = req.params.user;
  userModel.findOne({username: username})
    .then(userInfo => {
      if (userInfo) {
        res.locals.userInfo = userInfo;
        return next();
      }
      return next(createErr({
        method: 'getUser',
        type: 'when getting user entry from DB',
        err: 'could not locate user in DB.'
      }));
    })
    .catch(err => next(createErr({
      method: 'getUser',
      type: 'when getting user entry from DB',
      err: err
    })));
}

module.exports = userController;