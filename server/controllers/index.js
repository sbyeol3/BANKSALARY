const express = require('express');
const router = express.Router();
const userSevice = require('../services/user');

router.post('/signin', (req, res, next) => {
  try {
    userSevice.signin(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
