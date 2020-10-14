const express = require('express');
const router = express.Router();
const StatisticsService = require('../../services/statistics');
const { error: ERROR } = require('../../services/serverMsg');

router.get('/category', async (req, res) => {
  try {
    await StatisticsService.readCategories(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

router.get('/date', async (req, res) => {
  try {
    await StatisticsService.readCategories(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

module.exports = router;
