const express = require('express');
const router = express.Router();
const CategoryService = require('../../services/category');
const { error: ERROR } = require('../../services/serverMsg');

router.get('/:type', async (req, res) => {
  try {
    await CategoryService.read(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

module.exports = router;
