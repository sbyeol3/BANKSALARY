const {
  success: SUCCESS,
  error: ERROR,
  success,
} = require('../services/serverMsg');
const logModel = require('../models/log');
const { isValidMonth } = require('./util');

const read = async (req, res, method = 'read') => {
  const { id } = req.user;
  const { year = 2020, month } = req.query;
  if (!month || !isValidMonth(month)) {
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

const deleteLog = async (req, res) => {
  const { id } = req.user;
  const { logId } = req.params;
  if (!+logId) return res.status(400).json({ message: ERROR.invalidRequest });
  const { affectedRows } = await logModel.deleteLog({ userId: id, logId });
  if (!affectedRows) {
    return res.status(422).json({ message: ERROR.unprocessable });
  }
  return res.status(200).json({ message: success.delete });
};

module.exports = {
  read,
  deleteLog,
};
