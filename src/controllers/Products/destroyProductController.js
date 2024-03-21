const { Products } = require('#DB_CONNECTION');
const { MISSING_PARAMS_ERROR, PRODUCT_NOT_FOUND_ERROR } = require('#ERRORS');
const { validateToken } = require('#SERVICES/jwt');

const destroyProductController = async ({ productId, token }) => {
  validateToken(token);
  if (!productId) throw new MISSING_PARAMS_ERROR('Missing params');
  const product = await Products.findByPk(productId);
  if (!product) {
    throw new PRODUCT_NOT_FOUND_ERROR(`Product with id ${productId} not found`);
  }
  await product.destroy();
  return product;
};

module.exports = destroyProductController;
