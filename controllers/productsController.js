// Renomeie esse arquivo
const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const result = await productsService.getAll();
  return res.status(200).json(result);
};

const find = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.find(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.create(name, quantity);
  if (!result) return res.status(409).json({ message: 'Product already exists' });
  return res.status(201).json(result);
};

const edit = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await productsService.edit(id, name, quantity);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};

const erase = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.erase(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).end();
};

module.exports = {
  getAll,
  find,
  create,
  edit,
  erase,
};