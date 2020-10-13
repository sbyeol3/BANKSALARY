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
  create: `INSERT INTO TRANSACTION_LOG(kind, price, contents, logDate, userId, payment, ctgCode)
    VALUES(?, ?, ?, ?, ?, ?, ?)`,
  read: `SELECT log.*, code.title as category FROM (
    (SELECT l.logId, l.kind, l.price, l.contents, l.logDate, l.payment as payCode,
      p.title as payment, l.ctgCode FROM (SELECT * FROM TRANSACTION_LOG
      WHERE userId = ? AND logDate AND YEAR(logDate) = ? AND MONTH(logDate) = ? ) as l
    LEFT JOIN USER_PAYMENT p ON l.payment=p.code
    ORDER BY l.logDate)
    ) as log INNER JOIN codetable code
    ON log.ctgCode=code.code;
    ;`,
  readSumTotal: `SELECT sum(price) as total, kind FROM TRANSACTION_LOG
    WHERE userId = ? AND YEAR(logDate) = ? AND MONTH(logDate) = ?
    GROUP BY kind;`,
  update: `UPDATE transaction_log SET kind=?, price=?, contents=?, logDate=?, payment=?, ctgCode=?
    WHERE logId=? AND userId=?;`,
  delete: 'DELETE FROM TRANSACTION_LOG WHERE userId = ? AND logId = ?;',
};

module.exports = {
  userQuery,
  paymentQuery,
  categoryQuery,
  logQuery,
};
