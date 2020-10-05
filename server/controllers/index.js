const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const userSevice = require('../services/user');

router.post('/signin', (req, res, next) => {
  try {
    userSevice.signin(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

router.get('/signout', (req, res, next) => {
  try {
    userSevice.signout(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

router.all('/api', apiRouter);
module.exports = router;
