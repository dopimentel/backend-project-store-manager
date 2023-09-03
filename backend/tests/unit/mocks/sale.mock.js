const DATE = '2021-09-09T04:54:29.000Z';
const salesFromDB = [
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
    productId: 1,
    quantity: 2,
  },
  {
    date: DATE,
    productId: 2,
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

const saleFromDBIdNotExists = [];

const salesFromService = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const serviceResponseCreated = {
  status: 'CREATED',
  data: {
    id: 3,
    itensSold: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ],
  },
};

const serviceResponseSucessful = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const serviceResponseByIdSucessful = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const serviceResponseNotFound = {
  status: 'NOT_FOUND',
  data: {
    message: 'Sale not found',
  },
};

module.exports = {
  DATE,
  salesFromDB,
  saleFromDB,
  salesFromModel,
  saleFromModel,
  saleFromDBIdNotExists,
  salesFromService,
  serviceResponseCreated,
  serviceResponseSucessful,
  serviceResponseByIdSucessful,
  serviceResponseNotFound,
};
