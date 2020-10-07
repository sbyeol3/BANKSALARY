const pool = require('./index');
const { logQuery } = require('./query');

const create = async (data) => {
  const { userId, kind, price, contents, ctgCode, payment, logDate } = data;
  const query = logQuery.create;
  const paymentCode = kind === 0 ? payment : null;
  const [rows] = await pool.execute(query, [
    kind,
    price,
    contents,
    logDate,
    userId,
    paymentCode,
    ctgCode,
  ]);
  return rows;
};

const readLogs = async (data) => {
  const { userId, year, month } = data;
  const query = logQuery.read;
  const [rows] = await pool.execute(query, [userId, year, month]);
  return rows;
};

const readTotalByMonth = async (data) => {
  const { userId, year, month } = data;
  const query = logQuery.readSumTotal;
  const [rows] = await pool.execute(query, [userId, year, month]);
  return rows;
};

const update = async (data) => {
  const {
    userId,
    kind,
    price,
    contents,
    ctgCode,
    payment,
    logDate,
    logId,
  } = data;
  const query = logQuery.update;
  const paymentCode = kind === 0 ? payment : null;
  const [rows] = await pool.execute(query, [
    kind,
    price,
    contents,
    logDate,
    paymentCode,
    ctgCode,
    logId,
    userId,
  ]);
  return rows;
};

const deleteLog = async (data) => {
  const { userId, logId } = data;
  const query = logQuery.delete;
  const [rows] = await pool.execute(query, [userId, logId]);
  console.log(rows);
  return rows;
};

module.exports = {
  create,
  readLogs,
  readTotalByMonth,
  update,
  deleteLog,
};
