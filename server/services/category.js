const { success: SUCCESS, error: ERROR } = require('../services/serverMsg');
const code = require('../models/code.json');
const categoryModel = require('../models/category');

const read = async (req, res) => {
  const { type } = req.params;
  if (type !== '0' && type !== '1') {
    return res.status(400).json({ message: ERROR.invalidRequest });
  }
  const parent = type === '1' ? code.CATEGORY_IN : code.CATEGORY_OUT;
  const data = await categoryModel.readCategories(parent);
  return res.status(200).json({ message: SUCCESS.read, data: [...data] });
};

module.exports = {
  read,
};
