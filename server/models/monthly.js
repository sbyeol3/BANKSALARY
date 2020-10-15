const pool = require('./index');
const { monthlyQuery } = require('./query');

const readOutgoings = async (data) => {
  const { year, month, userId } = data;
  const query = monthlyQuery.readOutgoings;
  const [rows] = await pool.execute(query, [year, month, userId]);
  return rows;
};

const readIncomings = async (data) => {
  const { year, month, userId } = data;
  const query = monthlyQuery.readIncomings;
  const [rows] = await pool.execute(query, [year, month, userId]);
  return rows;
};

module.exports = {
  readOutgoings,
  readIncomings,
};
