const { Products } = require('#DB_CONNECTION');
const { MISSING_PARAMS_ERROR, PRODUCT_NOT_FOUND_ERROR } = require('#ERRORS');

const destroyProductController = async ({ productId }) => {
    if (!productId) throw new MISSING_PARAMS_ERROR("Faltan parametros");
    const product = await Products.findByPk(productId);
    if (!product) {
        throw new PRODUCT_NOT_FOUND_ERROR("Producto no encontrado");
    }
    await product.destroy();
    return product;
};

module.exports = destroyProductController;
