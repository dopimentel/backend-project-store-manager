const { saleService } = require('../services');
const mapStatus = require('../utils/mapStatus');

const getAll = async (req, res) => {
  const { status, data } = await saleService.getAll();
  return res.status(mapStatus(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.findById(id);
  return res.status(mapStatus(status)).json(data);
};

const createSaleProduct = async (req, res) => {
  const { status, data } = await saleService.createSaleProduct(req.body);
  return res.status(mapStatus(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.deleteSale(Number(id));
  return res.status(mapStatus(status)).json(data);
};

const updateProductQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await saleService
    .updateProductQuantity(Number(saleId), Number(productId), Number(quantity));
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  getAll,
  findById,
  createSaleProduct,
  deleteSale,
  updateProductQuantity,
};
