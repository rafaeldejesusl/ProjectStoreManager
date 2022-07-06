const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const find = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [id],
  );
  return result[0];
};

const findName = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name=?',
    [name],
  );
  return result[0];
};

const create = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products(name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return { id: result.insertId, name, quantity };
};

const edit = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?',
    [name, quantity, id],
  );
  return { id, name, quantity };
};

const erase = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?',
    [id],
  );
  return { id };
};

module.exports = {
  getAll,
  find,
  findName,
  create,
  edit,
  erase,
};