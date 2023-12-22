const { Carts } = require('#DB_CONNECTION');
const createOrder = require('./createOrderController');
const {
    MISSING_PARAMS_ERROR,
    CART_NOT_FOUND_ERROR,
} = require('#ERRORS');

const creatOrderByCartIdController = async ({ idCart }) => {

    if (!idCart) throw new MISSING_PARAMS_ERROR('Missing params');

    const cart = await Carts.findOne({ where: { idCart } });

    if (!cart) {
        throw new CART_NOT_FOUND_ERROR(`Cart with id ${idCart} not found`);
    }

    const { products, userId } = cart;

    const order = await createOrder({ products, idUser: userId });

    return order;

};

module.exports = creatOrderByCartIdController;
