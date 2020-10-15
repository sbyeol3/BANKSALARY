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
    ) as log INNER JOIN CODETABLE code
    ON log.ctgCode=code.code;
    ;`,
  readSumTotal: `SELECT sum(price) as total, kind FROM TRANSACTION_LOG
    WHERE userId = ? AND YEAR(logDate) = ? AND MONTH(logDate) = ?
    GROUP BY kind;`,
  update: `UPDATE transaction_log SET kind=?, price=?, contents=?, logDate=?, payment=?, ctgCode=?
    WHERE logId=? AND userId=?;`,
  delete: 'DELETE FROM TRANSACTION_LOG WHERE userId = ? AND logId = ?;',
};

const statisticsQuery = {
  readCount: `SELECT count(logId) as total, sum(price) as sum FROM TRANSACTION_LOG
    WHERE YEAR(logDate)=? AND MONTH(logDate)=? AND userId=? AND kind=0;`,
  readByCategory: `SELECT ctg.title, log.*, log.sum FROM (
    SELECT ctgCode, count(ctgCode) AS count, sum(price) AS sum FROM TRANSACTION_LOG
    WHERE YEAR(logDate)=? AND MONTH(logDate)=? AND userId=? AND kind=0
    GROUP BY ctgCode) AS log
    LEFT JOIN CODETABLE ctg ON log.ctgCode = ctg.code;`,
  readByDate: `SELECT sum(price) AS price, DAY(logDate) AS day
    FROM TRANSACTION_LOG
    WHERE YEAR(logDate)=? AND MONTH(logDate)=? AND userId=? AND kind=0 
    GROUP BY logDate;`,
};

const monthlyQuery = {
  readOutgoings: `SELECT sum(price) AS outgoings, DAY(logDate) AS day
  FROM TRANSACTION_LOG
  WHERE YEAR(logDate)=? AND MONTH(logDate)=? AND userId=? AND kind=0 
  GROUP BY logDate;`,
  readIncomings: `SELECT sum(price) AS incomings, DAY(logDate) AS day
  FROM TRANSACTION_LOG
  WHERE YEAR(logDate)=? AND MONTH(logDate)=? AND userId=? AND kind=1 
  GROUP BY logDate;`,
};

module.exports = {
  userQuery,
  paymentQuery,
  categoryQuery,
  logQuery,
  monthlyQuery,
  statisticsQuery,
};
