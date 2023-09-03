const { saleSchema } = require('./schemas');
const joiErrorStatus = require('../utils/joiErrorStatus');

const validateSaleItem = (req, res, next) => {
  const { error } = saleSchema.validate(req.body);
  if (error) {
    const { details } = error;
    const { type } = details[0];
    console.log(error);
    console.log(type);
    return res.status(joiErrorStatus(type)).json({ message: error.message.replace(/\[\d+\]\./g, '') });
  }
  next();
}

module.exports = {
  validateSaleItem,
};
