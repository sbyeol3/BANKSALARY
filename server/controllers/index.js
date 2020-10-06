const express = require('express');
const router = express.Router();
const apiRouter = require('./api/index');
const userSevice = require('../services/user');
const { error: ERROR } = require('../services/serverMsg');

router.post('/signin', (req, res, next) => {
  try {
    userSevice.signin(req, res, next);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

router.get('/signout', (req, res, next) => {
  try {
    userSevice.signout(req, res, next);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

router.use('/api', apiRouter);
module.exports = router;
