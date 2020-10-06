const { decodeToken } = require('./util');
const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const paymentModel = require('../models/payment');

const create = async (req, res) => {
  const decodedToken = decodeToken(req);
  const { id } = decodedToken;
  const { title } = req.body;
  if (!title) return res.staus(400).json({ message: ERROR.invalidRequest });
  const { affectedRows } = await paymentModel.createPayMethod({ id, title });
  if (affectedRows) {
    const data = await paymentModel.readPayMethod(id);
    return res.status(200).json({ message: SUCCESS.create, data: [...data] });
  }
  throw Error;
};

module.exports = {
  create,
};
