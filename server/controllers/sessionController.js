const Session = require('../models/sessionModel');

//error gen
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `sessionController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in sessionController.${method}. Check server logs for more details.` }
  };
};

//session controllers
const sessionController = {};

sessionController.setCookie = (req, res, next) => {

  const { _id } = res.locals.userInfo;
  const idString = String(_id);

  res.cookie('ssid', idString, {
    secure: true,
    httpOnly: true
  });

  return next();
}

sessionController.startSession = (req, res, next) => {

  const { _id } = res.locals.userInfo;
  const idString = String(_id);

  Session.findOne({ cookieId: idString})
    .then(result => {
      if (!result) {
        Session.create({
          cookieId: idString,
          createdAt: new Date(),
        })
          .then((result) => {
            if (result) return next();
          });
      } else {
        return next();
      };
    })
    .catch(err => next(createErr({
      method: 'startSession',
      type: 'when starting new session',
      err: err
    })
  ));
};

sessionController.isLoggedIn = (req, res, next) => {

  Session.findOne({ cookieId: req.cookies.ssid })
  .then(result => {
    if (result) {
      res.locals.cookie = result.cookieId;
      return next();   
    } else {
      res.status(400).send('session not found');
    }
  })
  .catch(err => next(createErr({
    method: 'isLoggedIn',
    type: 'when when verifying user is logged in via cookies',
    err: err
  })));
};

module.exports = sessionController;