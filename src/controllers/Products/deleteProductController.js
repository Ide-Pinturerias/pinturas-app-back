const { Products } = require('#DB_CONNECTION');
const decodedToken = require("#SERVICES/decodedJwt");

const {
    PRODUCT_NOT_FOUND_ERROR,
    MISSING_PARAMS_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require('#ERRORS');

const deleteProductController = async ({ productId, token }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Falta token de autorizacion");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    if (!productId) throw new MISSING_PARAMS_ERROR("Faltan parametros");

    // Buscar el producto por su ID en la base de datos
    const product = await Products.findByPk(productId);

    if (!product) throw new PRODUCT_NOT_FOUND_ERROR("Producto no encontrado");

    await product.update({ active: false })
        .then(productDeleted => productDeleted)
        .catch(error => { throw error; });

};

module.exports = deleteProductController;
