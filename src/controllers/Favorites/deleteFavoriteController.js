const { Users, Products } = require("#DB_CONNECTION");
const {
    USER_NOT_FOUND_ERROR,
    PRODUCT_NOT_FOUND_ERROR,
    MISSING_PARAMS_ERROR,
} = require("#ERRORS");

const deleteFavoriteController = async ({ idUser, idProduct }) => {

    if (!idUser || !idProduct){
        throw new MISSING_PARAMS_ERROR("Missing params");
    }

    const user = await Users.findByPk(idUser);
    if (!user) {
        throw new USER_NOT_FOUND_ERROR(`User with id ${idUser} not found`);
    }

    const productFavorite = await Products.findByPk(idProduct);
    if (!productFavorite) {
        throw new PRODUCT_NOT_FOUND_ERROR(`Product with id ${idProduct} not found`);
    }

    await user.removeProduct(productFavorite);

    return await user.getProducts();
};

module.exports = deleteFavoriteController;
