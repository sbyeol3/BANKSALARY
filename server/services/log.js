const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const logModel = require('../models/log');
const {
  CATEGORY_OUT,
  CATEGORY_IN,
  PAYMENT_METHOD,
} = require('../models/code.json');
const {
  isValidMonth,
  getParentCode,
  isValidDate,
  convertDateToStr,
} = require('./util');

const checkTypeValidation = (data) => {
  const { kind, price, contents, category: ctgCode, payment, logDate } = data;
  const ctgParentCode = kind === 0 ? CATEGORY_OUT : CATEGORY_IN;

  if (kind !== 0 && kind !== 1) return false;
  if (typeof price !== 'number') return false;
  if (typeof contents !== 'string' || typeof logDate !== 'string') return false;
  if (getParentCode(ctgCode) !== ctgParentCode) return false;
  if (kind === 0 && getParentCode(payment) !== PAYMENT_METHOD) return false;
  if (!isValidDate(logDate)) return false;
  return true;
};

const convertFormatSum = (total) => {
  return total.reduce(
    (prev, data) => {
      const { kind, total } = data;
      prev[kind] = total;
      return prev;
    },
    { 0: 0, 1: 0 }
  );
};

const convertFormatLogs = (logs) => {
  const logsByDate = new Map();
  logs.forEach((log) => {
    const { logDate, price, kind } = log;
    const date = convertDateToStr(logDate);
    const value = logsByDate.get(date) || { total: { 0: 0, 1: 0 }, logs: [] };
    logsByDate.set(date, {
      total: {
        ...value.total,
        [kind]: value.total[kind] + +price,
      },
      logs: [...value.logs, log],
    });
  });
  return logsByDate;
};

const read = async (req, res, method = 'read') => {
  const { id } = req.user;
  const { year = 2020, month } = req.query;
  if (!month || !isValidMonth(month)) {
    return res.status(400).json({ message: ERROR.invalidRequest });
  }
  const passedParams = { userId: id, year, month };
  const data = await logModel.readLogs(passedParams);
  const total = await logModel.readTotalByMonth(passedParams);
  const sum = convertFormatSum(total);
  const logs = convertFormatLogs(data);

  return res.status(200).json({
    message: SUCCESS[method],
    data: {
      logs: [...logs],
      sum,
    },
  });
};

const create = async (req, res) => {
  try {
    const { id } = req.user;
    const data = req.body;
    const valid = checkTypeValidation(data);
    if (!valid) return res.status(400).json({ message: ERROR.invalidRequest });
    const { affectedRows } = await logModel.create({ userId: id, ...data });
    if (affectedRows) {
      return res.status(200).json({ message: SUCCESS.create });
    }
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: ERROR.unprocessable });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.user;
    const { logId } = req.params;
    const data = req.body;
    const valid = checkTypeValidation(data);
    if (!valid) return res.status(400).json({ message: ERROR.invalidRequest });
    const { affectedRows } = await logModel.update({
      userId: id,
      logId,
      ...data,
    });
    if (!affectedRows) {
      return res.status(422).json({ message: ERROR.unprocessable });
    }
    return res.status(200).json({ message: SUCCESS.create });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: ERROR.unprocessable });
  }
};

const deleteLog = async (req, res) => {
  const { id } = req.user;
  const { logId } = req.params;
  if (!+logId) return res.status(400).json({ message: ERROR.invalidRequest });
  const { affectedRows } = await logModel.deleteLog({ userId: id, logId });
  if (!affectedRows) {
    return res.status(422).json({ message: ERROR.unprocessable });
  }
  return res.status(200).json({ message: SUCCESS.delete });
};

module.exports = {
  read,
  create,
  update,
  deleteLog,
};
