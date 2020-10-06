const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const logModel = require('../models/log');

const read = async (req, res, method = 'read') => {
  const { id } = req.user;
  const data = await logModel.readLogs(id);
  return res.status(200).json({ message: SUCCESS[method], data: [...data] });
};

module.exports = {
  read,
};
