const { Carts, Users } = require('../../db');
const { v4 } = require('uuid');

class UserError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'UserError';
        this.status = status;
    }
}

const createOrFindCartController = async ({ idUser }) => {

    const user = await Users.findByPk(idUser) || null;
    // if (!user) throw new Error('User not found');
    if (!user) throw new UserError('User not found', 404);

    const cart = await user.getCart();

    if (cart) return cart;

    const idCart = v4();

    const createdCart = await Carts.create({
        idCart
    });

    await user.setCart(createdCart);

    return createdCart;

};

module.exports = createOrFindCartController;
