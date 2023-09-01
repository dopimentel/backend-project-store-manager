const { productModel } = require('../models');

const getAll = async () => {
  const products = await productModel.getAll();
  console.log(products);
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getAll,
  findById,
};
