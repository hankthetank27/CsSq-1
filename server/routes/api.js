const express = require('express');

const controllers = require('../controllers/controllers');

const router = express.Router();

router.post('/',
  controllers.testPost,
  (req, res) => res.status(200).json(res.locals.newTest)
);

module.exports = router;