const pool = require('./index');
const { logQuery } = require('./query');

const readLogs = async (userId) => {
  const query = logQuery.read;
  const [rows] = await pool.execute(query, [userId]);
  return rows;
};

module.exports = {
  readLogs,
};
