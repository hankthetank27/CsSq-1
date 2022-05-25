const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/',
  userController.getUser, sessionController.setCookie,
  (req, res) => res.status(200).json(res.locals.userInfo)
)

router.post('/',
  userController.createNewUser,
  (req, res) => res.status(200).json(res.locals.newUser)
);

module.exports = router;