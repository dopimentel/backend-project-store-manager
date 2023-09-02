const DATE = '2021-09-09T04:54:29.000Z';
const salesFromDB = [
  {
    sale_id: 1,
    date: DATE,
    product_id: 1,
    quantity: 2,
  },
  {
    sale_id: 1,
    date: DATE,
    product_id: 2,
    quantity: 3,
  },
  {
    sale_id: 2,
    date: DATE,
    product_id: 3,
    quantity: 4,
  },
];

const salesFromModel = [
  {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 3,
  },
  {
    saleId: 2,
    date: DATE,
    productId: 3,
    quantity: 4,
  },
];


const saleFromDB = [
  {
    date: DATE,
    product_id: 1,
    quantity: 2,
  },
  {
    date: DATE,
    product_id: 2,
    quantity: 3,
  },
];

const saleFromModel = [
  {
    date: DATE,
    productId: 1,
    quantity: 2,
  },
  {
    date: DATE,
    productId: 2,
    quantity: 3,
  },
];


module.exports = {
  DATE,
  salesFromDB,
  saleFromDB,
  salesFromModel,
  saleFromModel,
};
