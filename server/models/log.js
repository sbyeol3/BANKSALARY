const pool = require('./index');
const { logQuery } = require('./query');

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

const deleteLog = async (data) => {
  const { userId, logId } = data;
  const query = logQuery.delete;
  const [rows] = await pool.execute(query, [userId, logId]);
  console.log(rows);
  return rows;
};

module.exports = {
  readLogs,
  readTotalByMonth,
  deleteLog,
};
