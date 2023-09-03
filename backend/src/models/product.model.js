const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (product.length === 0) return null;
  return product[0];
};

const create = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const update = async (id, name) => {
  const product = await findById(id);
  if (!product) return null;
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return { id, name };
};

const deleteProduct = async (id) => {
  const product = await findById(id);
  if (!product) return null;
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};