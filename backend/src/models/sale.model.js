const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT SP.sale_id, SP.product_id, S.date, SP.quantity
  FROM sales_products AS SP
  INNER JOIN sales AS S
  ON SP.sale_id = S.id 
  ORDER BY sale_id ASC, product_id ASC`);
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
