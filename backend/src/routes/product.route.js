const route = require('express').Router();
const { productController } = require('../controllers');
const { validateProduct } = require('../middlewares/validationsInputValues');

route.get('/', productController.getAll);
route.get('/:id', productController.findById);
route.post('/', validateProduct, productController.create);

module.exports = route;