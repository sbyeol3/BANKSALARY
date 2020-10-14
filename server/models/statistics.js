const pool = require('./index');
const { statisticsQuery } = require('./query');

const readTotalCount = async (data) => {
  const { year, month, userId } = data;
  const query = statisticsQuery.readCount;
  const [rows] = await pool.execute(query, [year, month, userId]);
  if (!rows || rows.length === 0) return 0;
  return rows[0].count || 0;
};

const readCategories = async (data) => {
  const { year, month, userId } = data;
  const query = statisticsQuery.readByCategory;
  const [rows] = await pool.execute(query, [year, month, userId]);
  return rows;
};

const readDates = async (data) => {
  const { year, month, userId } = data;
  const query = statisticsQuery.readByDate;
  const [rows] = await pool.execute(query, [year, month, userId]);
  return rows;
};

module.exports = {
  readTotalCount,
  readCategories,
  readDates,
};
