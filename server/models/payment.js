const pool = require('./index');
const { paymentQuery } = require('./query');

const createPayMethod = async (data) => {
  const { id, title } = data;
  const query = paymentQuery.create;
  const [rows] = await pool.execute(query, [id, title]);
  return rows;
};

const readPayMethod = async (id) => {
  const query = paymentQuery.read;
  const [rows] = await pool.execute(query, [id]);
  return rows;
};

module.exports = {
  createPayMethod,
  readPayMethod,
};
