const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/isAuthenticated');
const payment = require('./payment');
const category = require('./category');
const log = require('./log');
const monthly = require('./monthly');
const statistics = require('./statistics');

router.use(isAuthenticated);
router.use('/payment', payment);
router.use('/category', category);
router.use('/log', log);
router.use('/monthly', monthly);
router.use('/statistics', statistics);
module.exports = router;
