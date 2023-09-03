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

const create = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productService.create(name);
  return res.status(mapStatus(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productService.update(Number(id), name);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
