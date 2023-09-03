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

const update = async (id, name) => {
  const product = await productModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await productModel.update(id, name);
  return { status: 'SUCCESSFUL', data: { id, name } };
};

const deleteProduct = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await productModel.deleteProduct(id);
  return { status: 'NO_CONTENT', data: product };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};
