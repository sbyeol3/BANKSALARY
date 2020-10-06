const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      process.env.ENCRYPT_SALT,
      19328,
      64,
      'sha512',
      (err, key) => {
        if (err) reject('encrypt error');
        resolve(key.toString('base64'));
      }
    );
  });
};

exports.decodeToken = (req) => {
  const { authorization } = req.headers;
  return jwt.decode(authorization, process.env.JWT_SECRET_KEY);
};

exports.getParentCode = (code) => {
  const codeToString = code.toString();
  return +codeToString.substr(0, 3);
};
