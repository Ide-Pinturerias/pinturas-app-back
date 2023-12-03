const { Users, Carts } = require('#DB_CONNECTION');
const {
    MISSING_PARAMS_ERROR,
    USER_NOT_FOUND_ERROR,
    CART_NOT_FOUND_ERROR
} = require('#ERRORS');

const deleteCartController = async ({ idUser, idCart }) => {

    if (!idUser && !idCart) {
        throw new MISSING_PARAMS_ERROR('Missing params', 400);
    }

    const user = idUser ? await Users.findOne({
        where: {
            id: idUser
        }
    }) : null;

    if (!user) {
        throw new USER_NOT_FOUND_ERROR('User not found', 404);
    }

    const cart = idCart ? await Carts.findOne({
        where: {
            idCart
        }
    }) : await Carts.findOne({
        where: {
            userId: idUser
        }
    }) || null;

    if (!cart) {
        throw new CART_NOT_FOUND_ERROR('Cart not found', 404);
    }

    await user.update({
        idCart: null
    });

    await cart.destroy();

    return cart;

};

module.exports = deleteCartController;
