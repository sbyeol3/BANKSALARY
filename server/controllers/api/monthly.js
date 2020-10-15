const express = require('express');
const router = express.Router();
const MonthlyService = require('../../services/monthly');
const { error: ERROR } = require('../../services/serverMsg');

router.get('/', async (req, res) => {
  try {
    await MonthlyService.read(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

module.exports = router;
