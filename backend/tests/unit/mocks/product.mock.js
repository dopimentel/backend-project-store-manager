const productsFromDB = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
  },
];

const productFromDB = {
  id: 1,
  name: 'Skol Lata 250ml',
};

const productFromDBIdNotExists = [];

const productsFromModel = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
  },
];

const productFromModel = {
  id: 1,
  name: 'Skol Lata 250ml',
};

const productsFromService = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productFromService = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  productFromDB,
  productsFromDB,
  productFromDBIdNotExists,
  productsFromModel,
  productFromModel,
  productsFromService,
  productFromService,
  productFromServiceNotFound,
};