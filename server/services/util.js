const crypto = require('crypto');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { error: ERROR } = require('../services/serverMsg');
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

exports.isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', (passportError, user) => {
    if (passportError) return res.status(500).json({ message: ERROR.datebase });
    if (!user) return res.status(401).json({ message: ERROR.unauthorized });
    next();
  })(req, res, next);
};

exports.decodeToken = (req) => {
  const { authorization } = req.headers;
  return jwt.decode(authorization, process.env.JWT_SECRET_KEY);
};
