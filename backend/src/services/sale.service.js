const { saleModel } = require('../models');

const getAll = async () => {
  const sales = await saleModel.getAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
  const sale = await saleModel.findById(id);
  if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: sale };
};

const createSaleProduct = async (products) => {
  const newSale = await saleModel.createSaleProduct(products);
  return { status: 'CREATED', data: newSale };
};

const deleteSale = async (id) => {
  const sale = await saleModel.findById(id);
  if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  await saleModel.deleteSale(id);
  return { status: 'NO_CONTENT', data: sale };
};

module.exports = {
  getAll,
  findById,
  createSaleProduct,
  deleteSale,
};
