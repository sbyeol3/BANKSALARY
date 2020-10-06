const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const code = require('../models/code.json');
const paymentModel = require('../models/payment');
const { getParentCode } = require('./util');

const create = async (req, res) => {
  const { id } = req.user;
  const { title } = req.body;
  if (!title) return res.staus(400).json({ message: ERROR.invalidRequest });
  const { affectedRows } = await paymentModel.createPayMethod({ id, title });
  if (affectedRows) {
    const data = await paymentModel.readPayMethod(id);
    return res.status(200).json({ message: SUCCESS.create, data: [...data] });
  }
  throw Error;
};

const deletePayment = async (req, res) => {
  const { id } = req.user;
  const { paymentId } = req.params;
  const parentCode = getParentCode(paymentId);
  if (parentCode !== code.PAYMENT_METHOD) {
    return res.status(400).json({ message: ERROR.invalidCode });
  }
  const queryParams = { userId: id, code: paymentId };
  const { affectedRows } = await paymentModel.deletePayMethod(queryParams);
  console.log(affectedRows);
  if (!affectedRows) {
    return res.status(422).json({ message: ERROR.unprocessable });
  }
  const data = await paymentModel.readPayMethod(id);
  return res.status(200).json({ message: SUCCESS.delete, data: [...data] });
};

module.exports = {
  create,
  deletePayment,
};
