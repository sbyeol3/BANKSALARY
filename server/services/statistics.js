const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const { isValidMonth } = require('./util');
const statModel = require('../models/statistics');

const convertFullDays = (days, data) => {
  const month = new Array(days).fill(0);
  data.forEach((date) => {
    const { day, price } = date;
    month[day - 1] = +price;
  });
  return month;
};

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
    const { count, sum } = row;
    const added = {
      ...row,
      sum: +sum,
      percent: Math.round((count / total) * 100),
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
  const days = new Date(year, month - 1, 0).getDate();
  const avg = Math.round(sum / days);
  const converted = convertFullDays(days, data);
  return res.status(200).json({
    message: SUCCESS.read,
    data: { sum, avg, length: days, dates: converted },
  });
};

module.exports = {
  readCategories,
  readDates,
};
