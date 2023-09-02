const { addProductSchema } = require('./schemas');
const joiMapErrorToStatus = require('../utils/joiMapErrorToStatus');

const validateProduct = (req, res, next) => {
  const { name } = req.body;
  const { error } = addProductSchema.validate({ name });
  if (error) {
    const type = error.details[0].type;
    return res.status(joiMapErrorToStatus(type)).json({ message: error.message });
  };
  next();
}

module.exports = {
  validateProduct,
};