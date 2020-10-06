const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/isAuthenticated');
const payment = require('./payment');
const category = require('./category');

router.use(isAuthenticated);
router.use('/payment', payment);
router.use('/category', category);
module.exports = router;
