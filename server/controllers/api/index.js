const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../services/util');
const payment = require('./payment');

router.use(isAuthenticated);
router.use('/payment', payment);
module.exports = router;
