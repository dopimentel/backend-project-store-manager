const { addProductSchema } = require('./schemas');
const joiMapErrorToStatus = require('../utils/joiMapErrorToStatus');

const validateProduct = (req, res, next) => {
  const { name } = req.body;
  const { error } = addProductSchema.validate({ name });
  if (error) {
    const { details } = error;
    const { type } = details[0];
    return res.status(joiMapErrorToStatus(type)).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateProduct,
};