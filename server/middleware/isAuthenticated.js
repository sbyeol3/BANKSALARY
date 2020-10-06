const passport = require('passport');
const { error: ERROR } = require('../services/serverMsg');

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', (passportError, user) => {
    if (passportError) return res.status(500).json({ message: ERROR.datebase });
    if (!user) return res.status(401).json({ message: ERROR.unauthorized });
    req.user = { ...user };
    next();
  })(req, res, next);
};

module.exports = isAuthenticated;
