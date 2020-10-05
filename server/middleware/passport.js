const passport = require('passport');
const userModel = require('../models/user');
const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const { encryptPassword } = require('../services/util');

const passportConfig = { usernameField: 'username', passwordField: 'password' };
const passportVerify = async (username, rawPassword, done) => {
  try {
    const password = await encryptPassword(rawPassword);
    const [user] = await userModel.findOneBySignin({ username, password });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
const jwtVerify = async (payload, done) => {
  try {
    const [user] = await userModel.findOne(payload);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
  passport.use('jwt', new JWTStrategy(jwtConfig, jwtVerify));
};
