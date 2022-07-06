// Renomeie esse arquivo
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const find = async (id) => {
  const result = await productsModel.find(id);
  if (!result) return false;
  return result;
};

const create = async (name, quantity) => {
  const product = await productsModel.findName(name);
  if (product) return false;
  const result = await productsModel.create(name, quantity);
  return result;
};

const edit = async (id, name, quantity) => {
  const product = await productsModel.find(id);
  if (!product) return false;
  const result = await productsModel.edit(id, name, quantity);
  return result;
};

const erase = async (id) => {
  const product = await productsModel.find(id);
  if (!product) return false;
  const result = await productsModel.erase(id);
  return result;
};

module.exports = {
  getAll,
  find,
  create,
  edit,
  erase,
};