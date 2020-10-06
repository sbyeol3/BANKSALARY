const userQuery = {
  signin: 'SELECT id, username FROM USER WHERE username=? AND userpw=?;',
  find: 'SELECT id, username FROM USER WHERE id=? AND username=?;',
};

const paymentQuery = {
  create: 'INSERT INTO USER_PAYMENT(userId, title) VALUES(?,?);',
  read: 'SELECT code, title FROM USER_PAYMENT WHERE userId = ?;',
  delete: 'DELETE FROM USER_PAYMENT WHERE userId = ? AND code = ?;',
};

const categoryQuery = {
  read: 'SELECT code, title FROM CODETABLE WHERE parent = ?;',
};

const logQuery = {
  read:
    'SELECT logId, kind, price, contents, logDate, payment FROM transaction_log WHERE userId = ?;',
};

module.exports = {
  userQuery,
  paymentQuery,
  categoryQuery,
  logQuery,
};
