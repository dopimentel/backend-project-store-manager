const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleItemSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const saleSchema = Joi.array().items(saleItemSchema).min(1).required();

const updateProductQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  saleItemSchema,
  addProductSchema,
  saleSchema,
  updateProductQuantitySchema,
};
