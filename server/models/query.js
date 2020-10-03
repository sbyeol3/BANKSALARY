const userQuery = {
  signin: 'SELECT id, username FROM USER WHERE username=? AND userpw=?',
};

module.exports = {
  userQuery,
};
