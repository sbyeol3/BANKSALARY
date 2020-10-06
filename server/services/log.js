const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const logModel = require('../models/log');
const { isValidMonth } = require('./util');

const read = async (req, res, method = 'read') => {
  const { id } = req.user;
  const { year, month } = req.params;
  if (!isValidMonth(month)) {
    return res.status(400).json({ message: ERROR.invalidRequest });
  }
  const passedParams = { userId: id, year, month };
  const data = await logModel.readLogs(passedParams);
  const total = await logModel.readTotalByMonth(passedParams);
  return res.status(200).json({
    message: SUCCESS[method],
    data: {
      logs: [...data],
      sum: [...total],
    },
  });
};

module.exports = {
  read,
};
