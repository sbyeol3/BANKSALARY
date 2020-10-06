const passport = require('passport');
const jwt = require('jsonwebtoken');
const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');

const signin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: ERROR.invalidRequest });
  }

  passport.authenticate('local', (passportError, user) => {
    if (passportError) {
      return res.status(500).json({ message: ERROR.datebase });
    } else if (!user) {
      return res.status(403).json({ message: ERROR.siginin });
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        return res.status(500).json({ message: ERROR.internal });
      }
      const { id, username } = user;
      const token = jwt.sign({ id, username }, process.env.JWT_SECRET);
      return res.status(200).json({ message: SUCCESS.signin, token });
    });
  })(req, res, next);
};

const signout = (req, res, next) => {
  passport.authenticate('jwt', (passportError, user) => {
    if (passportError) return res.status(500).json({ message: ERROR.datebase });
    else if (!user) {
      return res.status(401).json({ message: ERROR.unauthorized });
    }
    req.logout();
    return res.status(200).json({ message: SUCCESS.signout });
  })(req, res, next);
};

module.exports = {
  signin,
  signout,
};
