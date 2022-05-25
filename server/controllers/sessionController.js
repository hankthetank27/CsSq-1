const Session = require('../models/sessionModel');

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
    .catch((err) => {
      return next(err);
    });
};

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid }).then((result) => {
    if (result) {
      res.locals.cookie = result.cookieId;
      return next();
    } 
    else {
      console.log('the cookie does not exist');
      res.status(200).send('session not found');
    }
  });
};

module.exports = sessionController;