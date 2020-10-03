const crypto = require('crypto');

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
