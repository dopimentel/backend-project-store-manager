const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT SP.sale_id, SP.product_id, S.date, SP.quantity
  FROM sales_products AS SP
  INNER JOIN sales AS S
  ON SP.sale_id = S.id 
  ORDER BY sale_id ASC, product_id ASC`);
  const camelSales = sales.map((sale) => ({
  saleId: sale.sale_id,
  productId: sale.product_id,
  date: sale.date,
  quantity: sale.quantity,
  }));
  return camelSales;
};

const findById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT SP.product_id, S.date, SP.quantity FROM sales_products AS SP
  INNER JOIN sales AS S
  ON SP.sale_id = S.id
  WHERE SP.sale_id = ?
  ORDER BY sale_id ASC, product_id ASC`, [id]);
  if (sale.length === 0) return null;
  return sale
    .map((s) => ({
      productId: s.product_id,
      date: s.date,
      quantity: s.quantity,
    }));
};

const createSale = async () => {
  const [{ insertId }] = await connection.execute(`INSERT INTO sales (id, date) 
  VALUES (DEFAULT, CURRENT_TIMESTAMP);`);
  return insertId;
};

const createSaleProduct = async (products) => {
  const id = await createSale();
  const newSale = {
    id,
    itemsSold: products,
  };
  const productsPromises = products.map(async (product) => {
    const { productId, quantity } = product;
    await connection.execute(`INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`, [id, productId, quantity]);
  });
  await Promise.all(productsPromises);
  return newSale;
};

const deleteSale = async (id) => {
  const sale = await findById(id);
  if (!sale) return null;
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return sale;
};

module.exports = {
  getAll,
  findById,
  createSaleProduct,
  deleteSale,
};
