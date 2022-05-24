const express = require('express');

const controllers = require('../controllers/controllers');

const router = express.Router();

router.get('/:user',
  controllers.getUser,
  (req, res) => res.status(200).json(res.locals.userInfo)
)

router.post('/',
  controllers.createNewUser,
  (req, res) => res.status(200).json(res.locals.newUser)
);

module.exports = router;