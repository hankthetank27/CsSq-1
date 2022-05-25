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

userController.verifyUser = (req, res, next) => {
  const credentials = req.headers.authorization.split(' ');
  userModel.findOne({username: credentials[0]})
    .then(userInfo => {
      if (userInfo) {
        if (userInfo.username === credentials[0] && userInfo.password === credentials[1]) {
          console.log('userController.verifyUser: ', userInfo)
          res.locals.userInfo = userInfo;
          return next();
        }
      }
      return next(createErr({
        method: 'verifyUser',
        type: 'when getting user entry from DB',
        err: 'could not locate user in DB.'
      }));
    })
    .catch(err => next(createErr({
      method: 'verifyUser',
      type: 'when getting user entry from DB',
      err: err
    })));
}

userController.getUserInfo = (req, res, next) => {
  userModel.findOne({username: res.locals.cookie})
    .then(userInfo => {
      if (userInfo) {
          console.log('userController.getUserInfo: ', userInfo)
          res.locals.userInfo = userInfo;
          return next();
      }
      return next(createErr({
        method: 'getUserInfo',
        type: 'when getting user entry from DB',
        err: 'could not locate user in DB.'
      }));
    })
}

userController.updatePreset = (req, res, next) => {
  console.log('userController.updatePreset, req.body: ', req.body)
  const update = req.body
  userModel.findOneAndUpdate({username: res.locals.cookie}, {preset: update},
     {new: true})
      .then(userInfo => {
        if (userInfo) {
            console.log('userController.updatePreset, user found and updated: ', userInfo)
            res.locals.userInfo = userInfo;
            return next();
        }
        return next(createErr({
          method: 'getUserInfo',
          type: 'when getting user entry from DB',
          err: 'could not locate user in DB.'
        }));
      })
}

module.exports = userController;