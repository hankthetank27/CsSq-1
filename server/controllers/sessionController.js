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
  res.cookie('ssid', res.locals.userInfo.username, {
    secure: true,
    httpOnly: true
  })
  console.log('setCookie', res.locals.userInfo.username)
  return next();
}

sessionController.startSession = (req, res, next) => {
  Session.findOne({ cookieId: res.locals.userInfo.username })
    .then(result => {
      if (!result) {
        Session.create({
          cookieId: res.locals.userInfo.username,
          createdAt: new Date(),
        }).then((result) => {
          console.log('created session: ', result)
          if (result) return next();
        });
      } else {
        console.log('found session: ', result)
        return next();
      }
    })
    .catch(err => next(createErr({
      method: 'startSession',
      type: 'when starting new session',
      err: err
    })));
};

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid }).then((result) => {
    if (result) {
      res.locals.cookie = result.cookieId;
      console.log('sessionController.isLoggedIn: ', res.locals.cookie)
      return next();
    } 
    else {
      console.log('the cookie does not exist');
      res.status(200).send('session not found');
    }
  })
  .catch(err => next(createErr({
    method: 'isLoggedIn',
    type: 'when when verifying user is logged in via cookies',
    err: err
  })));
};

module.exports = sessionController;