const route = require('express').Router();
const { saleController } = require('../controllers');

route.get('/', saleController.getAll);
route.get('/:id', saleController.findById);
route.post('/', saleController.createSaleProduct);

module.exports = route;