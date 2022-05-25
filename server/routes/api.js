const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:user',
  userController.getUser,
  (req, res) => res.status(200).json(res.locals.userInfo)
)

router.post('/',
  userController.createNewUser,
  (req, res) => res.status(200).json(res.locals.newUser)
);

module.exports = router;