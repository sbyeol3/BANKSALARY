const passport = require('passport');
const userModel = require('../models/user');
const { Strategy: LocalStrategy } = require('passport-local');
const { encryptPassword } = require('../services/util');

const passportConfig = { usernameField: 'username', passwordField: 'password' };

const passportVerify = async (username, rawPassword, done) => {
  try {
    const password = await encryptPassword(rawPassword);
    const [user] = await userModel.findOneBySignin({ username, password });
    if (!user) {
      done(null, false);
    } else {
      return done(null, user);
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
};
