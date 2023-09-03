const route = require('express').Router();
const { saleController } = require('../controllers');
const { validateSaleItem } = require('../middlewares/validateSaleFields');

route.get('/', saleController.getAll);
route.get('/:id', saleController.findById);
route.post('/', validateSaleItem, saleController.createSaleProduct);
route.delete('/:id', saleController.deleteSale);

module.exports = route;