const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  console.log(products);
  return products;
};

const findById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (product.length === 0) return null;
  console.log(product[0]);
  return product[0];
};

module.exports = {
  getAll,
  findById,
};