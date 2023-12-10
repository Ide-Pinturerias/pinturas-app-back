const { Carts } = require('#DB_CONNECTION');
const {
    BAD_FORMAT_JSON_ERROR,
    CART_NOT_FOUND_ERROR,
    MISSING_PARAMS_ERROR
} = require('#ERRORS');


const editCartController = async ({ idUser, idCart, products = "{}" }) => {

    if (!idUser && !idCart) {
        throw new MISSING_PARAMS_ERROR('Missing params', 400);
    }

    const cart = idCart ? await Carts.findOne({
        where: {
            idCart
        }
    }) : await Carts.findOne({
        where: {
            userId: idUser
        }
    });


    if (!cart) {
        throw new CART_NOT_FOUND_ERROR(`Cart with id ${idCart} not found`, 404);
    }

    try {
        JSON.parse(products);
    }
    catch (error) {
        throw new BAD_FORMAT_JSON_ERROR('Bad format JSON', 400);
    }

    const newCart = await cart.update({
        products
    });

    return newCart;

};

module.exports = editCartController;
