const pool = require('./index');
const { categoryQuery } = require('./query');

const readCategories = async (parentCode) => {
  const query = categoryQuery.read;
  const [rows] = await pool.execute(query, [parentCode]);
  return rows;
};

module.exports = {
  readCategories,
};
