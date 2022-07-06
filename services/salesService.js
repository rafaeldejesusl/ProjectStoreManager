const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const check = async (itemArray) => {
  let notStock = false;
  const newArray = itemArray.map(async (e) => {
    const stock = await productsModel.find(e.productId);
    stock.quantity -= e.quantity;
    if (stock.quantity < 0) notStock = true;
  });
  await Promise.all(newArray);
  if (notStock) return false;
  return true;
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const find = async (id) => {
  const result = await salesModel.find(id);
  if (result.length === 0) return false;
  return result;
};

const create = async (itemsSold) => {
  const { id } = await salesModel.create();
  if (await check(itemsSold) === false) return false;
  const newArray = itemsSold.map(async (e) => {
    const stock = await productsModel.find(e.productId);
    stock.quantity -= e.quantity;
    await productsModel.edit(stock.id, stock.name, stock.quantity);
    await salesModel.createSP(id, e.productId, e.quantity);
  });
  await Promise.all(newArray);
  return { id, itemsSold };
};

const update = async (id, itemUpdated) => {
  if (await check(itemUpdated) === false) return false;
  const newArray = itemUpdated.map(async (e) => {
    const stock = await productsModel.find(e.productId);
    const registered = await salesModel.findSP(id, e.productId);
    stock.quantity -= (e.quantity - registered.quantity);
    await productsModel.edit(stock.id, stock.name, stock.quantity);
    await salesModel.updateSP(id, e.productId, e.quantity);
  });
  await Promise.all(newArray);
  return { saleId: id, itemUpdated };
};

const erase = async (id) => {
  const sale = await salesModel.find(id);
  if (sale.length === 0) return false;
  const newArray = sale.map(async (e) => {
    const stock = await productsModel.find(e.productId);
    stock.quantity += e.quantity;
    await productsModel.edit(stock.id, stock.name, stock.quantity);
  });
  await Promise.all(newArray);
  await salesModel.eraseSP(id);
  await salesModel.erase(id);
  return { id };
};

module.exports = {
  getAll,
  find,
  create,
  update,
  erase,
  check,
};