const pool = require('./index');
const { userQuery } = require('./query');

const findOneBySignin = async (data) => {
  const { username, password } = data;
  const query = userQuery.signin;
  const [rows] = await pool.execute(query, [username, password]);
  return rows;
};

const findOne = async (data) => {
  const { id, username } = data;
  const query = userQuery.find;
  const [rows] = await pool.execute(query, [id, username]);
  return rows;
};

module.exports = {
  findOneBySignin,
  findOne,
};
