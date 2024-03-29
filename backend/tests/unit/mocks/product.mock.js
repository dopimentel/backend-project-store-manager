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

const serviceResponseNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const serviceResponseNoContent = {
  status: 'NO_CONTENT',
  data: productFromModel,
};

const serviceResponseSucessful = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const serviceResponseByIdSucessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const serviceResponseCreated = {
  status: 'CREATED',
  data: productFromModel,
};

module.exports = {
  productFromDB,
  productsFromDB,
  productFromDBIdNotExists,
  productsFromModel,
  productFromModel,
  productsFromService,
  productFromService,
  serviceResponseNotFound,
  serviceResponseNoContent,
  serviceResponseSucessful,
  serviceResponseByIdSucessful,
  serviceResponseCreated,
};