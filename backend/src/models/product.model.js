const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  console.log(products);
  return products;
}


module.exports = {
  getAll,
};

