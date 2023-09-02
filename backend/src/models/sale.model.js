const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT SP.sale_id, SP.product_id, S.date, SP.quantity
  FROM sales_products AS SP
  INNER JOIN sales AS S
  ON SP.sale_id = S.id 
  ORDER BY sale_id ASC, product_id ASC`);
  const camelSales = sales.map((sale) => {
    return { saleId: sale.sale_id, productId: sale.product_id, date: sale.date, quantity: sale.quantity };
  });
  return camelSales;
};

const findById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT SP.product_id, S.date, SP.quantity
  FROM sales_products AS SP
  INNER JOIN sales AS S
  ON SP.sale_id = S.id
  WHERE SP.sale_id = ?
  ORDER BY sale_id ASC, product_id ASC`, [id]);
  if (sale.length === 0) return null;
  const camelSale = sale.map((sale) => {
    return { productId: sale.product_id, date: sale.date, quantity: sale.quantity };
  });
  return camelSale;
};

module.exports = {
  getAll,
  findById,
};
