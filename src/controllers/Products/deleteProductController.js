const { Products } = require('#DB_CONNECTION');
const { validateToken } = require('#SERVICES/jwt');

const {
  PRODUCT_NOT_FOUND_ERROR,
  MISSING_PARAMS_ERROR
} = require('#ERRORS');

const deleteProductController = async ({ productId, token }) => {
  validateToken(token);
  if (!productId) throw new MISSING_PARAMS_ERROR('Missing params');

  // Buscar el producto por su ID en la base de datos
  const product = await Products.findByPk(productId);

  if (!product) throw new PRODUCT_NOT_FOUND_ERROR(`Product with id ${productId} not found`);

  await product.update({ active: false })
    .then(productDeleted => productDeleted)
    .catch(error => { throw error; });

  return product;
};

module.exports = deleteProductController;
