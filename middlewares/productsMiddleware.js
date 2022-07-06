// Renomeie esse arquivo
const NAME = { message: '"name" is required' };
const NAME_LENGTH = { message: '"name" length must be at least 5 characters long' };
const QUANTITY = { message: '"quantity" is required' };
const QUANTITY_VALUE = { message: '"quantity" must be greater than or equal to 1' };

const productsValidation = (req, res, next) => {
  const { name, quantity } = req.body;
  if (!name) return res.status(400).json(NAME);
  if (name.length < 5) return res.status(422).json(NAME_LENGTH);
  if (quantity === undefined) return res.status(400).json(QUANTITY);
  if (quantity <= 0) return res.status(422).json(QUANTITY_VALUE);
  return next();
};

module.exports = productsValidation;