const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const result = await salesService.getAll();
  return res.status(200).json(result);
};

const find = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.find(id);
  if (!result) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(result);
};

const create = async (req, res) => {
  const result = await salesService.create(req.body);
  if (!result) return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  return res.status(201).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.update(id, req.body);
  if (!result) return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  return res.status(200).json(result);
};

const erase = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.erase(id);
  if (!result) return res.status(404).json({ message: 'Sale not found' });
  return res.status(204).end();
};

module.exports = {
  getAll,
  find,
  create,
  update,
  erase,
};