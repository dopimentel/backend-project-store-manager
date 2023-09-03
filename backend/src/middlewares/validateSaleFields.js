const { saleSchema, updateProductQuantitySchema } = require('./schemas');
const joiErrorStatus = require('../utils/joiErrorStatus');
const { productService } = require('../services');

const validateSaleItem = async (req, res, next) => {
  const { error } = saleSchema.validate(req.body);
  if (error) {
    const { details } = error;
    const { type } = details[0];
    return res.status(joiErrorStatus(type))
      .json({ message: error.message.replace(/\[\d+\]\./g, '') });
  }
  const promisesProducts = req.body
    .map(async ({ productId }) => productService.findById(productId));
  const productsResponse = await Promise.all(promisesProducts);
  if (productsResponse.some(({ status }) => status === 'NOT_FOUND')) {
  return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const validateSaleQuantity = async (req, res, next) => {
  const { error } = updateProductQuantitySchema.validate(req.body);
  if (error) {
    const { details } = error;
    const { type } = details[0];
    return res.status(joiErrorStatus(type))
      .json({ message: error.message });
  }
  next();
};

module.exports = {
  validateSaleItem,
  validateSaleQuantity,
};
