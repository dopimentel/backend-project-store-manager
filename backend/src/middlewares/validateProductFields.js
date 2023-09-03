const { addProductSchema } = require('./schemas');
const joiErrorStatus = require('../utils/joiErrorStatus');

const validateProduct = (req, res, next) => {
  const { name } = req.body;
  const { error } = addProductSchema.validate({ name });
  if (error) {
    const { details } = error;
    const { type } = details[0];
    return res.status(joiErrorStatus(type)).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateProduct,
};