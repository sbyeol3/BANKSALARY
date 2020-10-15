const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const { isValidMonth } = require('./util');
const monthlyModel = require('../models/monthly');

const convertData = (days, inData, outData) => {
  const month = new Array(days).fill({ outgoings: 0, incomings: 0 });
  outData.forEach((data) => {
    const { outgoings, day } = data;
    console.log(data);
    month[day - 1] = { ...month[day - 1], outgoings: +outgoings };
  });
  inData.forEach((data) => {
    const { incomings, day } = data;
    month[day - 1] = { ...month[day - 1], incomings: +incomings };
  });
  return month;
};

const read = async (req, res) => {
  const { id } = req.user;
  const { year = 2020, month } = req.query;
  if (!month || !isValidMonth(month)) {
    return res.status(400).json({ message: ERROR.invalidRequest });
  }
  const params = { year, month, userId: id };
  const inData = await monthlyModel.readIncomings(params);
  const outData = await monthlyModel.readOutgoings(params);
  const days = new Date(year, month - 1, 0).getDate();
  const data = convertData(days, inData, outData);
  return res.status(200).json({
    message: SUCCESS.read,
    data: { length: days, dates: data },
  });
};

module.exports = {
  read,
};
