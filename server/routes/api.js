const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const { getUserInfo } = require('../controllers/userController');

const router = express.Router();

router.get('/',
  userController.verifyUser, sessionController.setCookie, sessionController.startSession,
  (req, res) => res.status(200).json(res.locals.userInfo)
)

router.get('/loadPreset', sessionController.isLoggedIn, userController.getUserInfo,
  (req, res) => res.status(200).json(res.locals.userInfo)
)

router.put('/updatePreset', sessionController.isLoggedIn, userController.updatePreset, 
  (req, res) => res.status(200).json(res.locals.userInfo)
)

router.post('/',
  userController.createNewUser,
  (req, res) => res.status(200).json(res.locals.newUser)
);

module.exports = router;