const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/',
  userController.getUser, sessionController.setCookie, sessionController.startSession,
  (req, res) => res.status(200).json(res.locals.userInfo)
)

router.get('/loadPreset', sessionController.isLoggedIn,
  (req, res) => res.status(200).json({ cookie: res.locals.cookie })
)

router.post('/',
  userController.createNewUser,
  (req, res) => res.status(200).json(res.locals.newUser)
);

module.exports = router;