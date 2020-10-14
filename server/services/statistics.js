const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const { isValidMonth } = require('./util');
const statModel = require('../models/statistics');

const readCategories = async (req, res) => {
  const { id } = req.user;
  const { year = 2020, month } = req.query;
  if (!month || !isValidMonth(month)) {
    return res.status(400).json({ message: ERROR.invalidRequest });
  }
  const data = await statModel.readCategories({ year, month, userId: id });
  const { total, sum } = await statModel.readTotalCount({
    year,
    month,
    userId: id,
  });
  const addedPercent = data.reduce((prev, row) => {
    const { count } = row;
    const added = {
      ...row,
      percent: (count / total) * 100,
    };
    return [...prev, added];
  }, []);
  return res.status(200).json({
    message: SUCCESS.read,
    data: { sum, categories: [...addedPercent] },
  });
};

const readDates = async (req, res) => {
  const { id } = req.user;
  const { year = 2020, month } = req.query;
  if (!month || !isValidMonth(month)) {
    return res.status(400).json({ message: ERROR.invalidRequest });
  }
  const data = await statModel.readDates({ year, month, userId: id });
  const { sum } = await statModel.readTotalCount({
    year,
    month,
    userId: id,
  });
  return res.status(200).json({
    message: SUCCESS.read,
    data: { sum, dates: [...data] },
  });
};

module.exports = {
  readCategories,
  readDates,
};
