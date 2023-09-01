const { productService } = require('../services');
const mapStatus = require('../utils/mapStatus');

const getAll = async (req, res) => {
  const { status, data } = await productService.getAll();
  return res.status(mapStatus(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  getAll,
  findById,
};
