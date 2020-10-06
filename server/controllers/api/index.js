const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/isAuthenticated');
const payment = require('./payment');
const category = require('./category');
const log = require('./log');

router.use(isAuthenticated);
router.use('/payment', payment);
router.use('/category', category);
router.use('/log', log);
module.exports = router;
