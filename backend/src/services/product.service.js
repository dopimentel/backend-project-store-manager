const { productModel } = require('../models');

const getAll = async () => {
  const products = await productModel.getAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

const create = async (name) => {
  const insertId = await productModel.create(name);
  return { status: 'CREATED', data: { id: insertId, name } };
};

module.exports = {
  getAll,
  findById,
  create,
};
