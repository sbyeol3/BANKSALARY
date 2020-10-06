const express = require('express');
const router = express.Router();
const PaymentService = require('../../services/payment');
const { error: ERROR } = require('../../services/serverMsg');

router.post('/', async (req, res) => {
  try {
    await PaymentService.create(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

router.delete('/:paymentId', async (req, res) => {
  try {
    await PaymentService.deletePayment(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: ERROR.internal });
  }
});

module.exports = router;
