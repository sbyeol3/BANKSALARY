const express = require('express');
const router = express.Router();
const LogService = require('../../services/log');
const { error: ERROR } = require('../../services/serverMsg');

router.get('/', async (req, res) => {
  try {
    await LogService.read(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

router.delete('/:logId', async (req, res) => {
  try {
    await LogService.deleteLog(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

module.exports = router;
