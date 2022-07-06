const ID = { message: '"productId" is required' };
const QUANTITY = { message: '"quantity" is required' };
const QUANTITY_VALUE = { message: '"quantity" must be greater than or equal to 1' };

const salesValidation = (req, res, next) => {
  req.body.forEach((e) => {
    const { productId, quantity } = e;
    if (productId === undefined) return res.status(400).json(ID);
    if (quantity === undefined) return res.status(400).json(QUANTITY);
    if (quantity <= 0) return res.status(422).json(QUANTITY_VALUE);
  });
  return next();
};

module.exports = salesValidation;