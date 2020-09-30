USE account;

DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS TRANSACTION_LOG;
DROP TABLE IF EXISTS USER_PAYMENT;
DROP TABLE IF EXISTS CODE;

CREATE TABLE USER (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    userpw VARCHAR(100) NOT NULL
);

CREATE TABLE USER_PAYMENT (
    code INT NOT NULL PRIMARY KEY,
    userId INT NOT NULL REFERENCES USER(id) ON DELETE CASCADE
);

CREATE TABLE TRANSACTION_LOG (
    logId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    kind BOOLEAN NOT NULL DEFAULT 0,
    price DEC(10,0) NOT NULL,
    contents VARCHAR(500),
    logDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL REFERENCES USER(id) ON DELETE CASCADE
);

CREATE TABLE CODE (
    code INT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    parent INT NOT NULL
);