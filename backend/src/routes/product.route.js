const route = require('express').Router();
const { productController } = require('../controllers');
const { validateProduct } = require('../middlewares/validateProductFields');

route.get('/', productController.getAll);
route.get('/:id', productController.findById);
route.post('/', validateProduct, productController.create);
route.put('/:id', validateProduct, productController.update);

module.exports = route;