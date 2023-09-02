const { saleModel } = require('../models');

const getAll = async () => {
  const sales = await saleModel.getAll();
  camelSales = sales.map((sale) => {
    return { saleId: sale.sale_id, productId: sale.product_id, date: sale.date, quantity: sale.quantity };
  });
  return { status: 'SUCCESSFUL', data: camelSales };
};

const findById = async (id) => {
  const sale = await saleModel.findById(id);
  if (!sale) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  getAll,
  findById,
};
