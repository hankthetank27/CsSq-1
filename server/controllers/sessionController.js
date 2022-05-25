const sessionController = {};

sessionController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.userInfo.username, {
    secure: true,
    httpOnly: true
  })
  console.log('setCookie', res.locals.userInfo.username)
  return next();
}

module.exports = sessionController;