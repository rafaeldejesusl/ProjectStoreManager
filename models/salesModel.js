const connection = require('./connection');

const serialize1 = (sale) => ({
saleId: sale.sale_id,
date: sale.date,
productId: sale.product_id,
quantity: sale.quantity,
});

const serialize2 = (sale) => ({
date: sale.date,
productId: sale.product_id,
quantity: sale.quantity,
});

const serialize3 = (sale) => ({
  saleId: sale.sale_id,
  productId: sale.product_id,
  quantity: sale.quantity,
  });

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id`,
  );
  return result.map(serialize1);
};

const find = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?;`,
    [id],
  );
  return result.map(serialize2);
};

const create = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES (NOW())',
  );
  return { id: result.insertId };
};

const createSP = async (id, productId, quantity) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
    [id, productId, quantity],
  );
  return { productId, quantity };
};

const updateSP = async (id, productId, quantity) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity=?
    WHERE sale_id=? AND product_id=?`,
    [quantity, id, productId],
  );
  return { productId, quantity };
};

const eraseSP = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE sale_id=?`,
    [id],
  );
  return { id };
};

const erase = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id=?`,
    [id],
  );
  return { id };
};

const findSP = async (id, productId) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products
    WHERE sale_id=? AND product_id=?`,
    [id, productId],
  );
  return result.map(serialize3)[0];
};

module.exports = {
  getAll,
  find,
  create,
  createSP,
  updateSP,
  eraseSP,
  erase,
  findSP,
};