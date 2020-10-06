const pool = require('./index');
const { userQuery } = require('./query');

const createPaymentMethod = async (data) => {
  const { id, title } = data;
  const [rows] = await pool.execute();
  return rows;
};
