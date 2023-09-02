const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute('SELECT * FROM StoreManager.sales_products ORDER BY sale_id ASC, product_id ASC');
  return sales;
};

const findById = async (id) => {
  const [sale] = await connection.execute('SELECT * FROM sales_products WHERE sale_id = ?', [id]);
  if (sale.length === 0) return null;
  return sale[0];
};

module.exports = {
  getAll,
  findById,
};
