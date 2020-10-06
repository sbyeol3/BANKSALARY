const userQuery = {
  signin: 'SELECT id, username FROM USER WHERE username=? AND userpw=?;',
  find: 'SELECT id, username FROM USER WHERE id=? AND username=?;',
};

const paymentQuery = {
  create: 'INSERT INTO USER_PAYMENT(userId, title) VALUES(?,?);',
  read: 'SELECT code, title FROM USER_PAYMENT WHERE userId = ?;',
  delete: 'DELETE FROM USER_PAYMENT WHERE userId = ? AND code = ?;',
};

module.exports = {
  userQuery,
  paymentQuery,
};
