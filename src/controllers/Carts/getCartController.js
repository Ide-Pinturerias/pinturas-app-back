const { Carts } = require('#DB_CONNECTION');
const { CART_NOT_FOUND_ERROR, MISSING_PARAMS_ERROR } = require('#ERRORS');

const getCartController = async ({ idUser, idCart }) => {

    if (!idUser && !idCart) throw new MISSING_PARAMS_ERROR('Missing params');

    const cart = idUser
        ? await Carts.findOne({ where: { userId: idUser } })
        : await Carts.findByPk(idCart);

    if (!cart) throw new CART_NOT_FOUND_ERROR(`Cart with id ${idCart} not found`);

    return {
        idCart: cart.idCart,
        idUser: cart.userId,
        products: cart.products
    };

};

module.exports = getCartController;
