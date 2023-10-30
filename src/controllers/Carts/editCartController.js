const { Carts, Users } = require('../../db');

const editCartController = async ({ userId, idCart, products }) => {

    const user = await Users.findOne({
        where: {
            id: userId
        }
    });

    const cart = idCart ? await Carts.findOne({
        where: {
            idCart
        }
    }) : await Carts.findOne({
        where: {
            userId
        }
    });

    if (!cart && !user) {
        throw new Error('No user or cart found');
    }

    const jsonProducts = products ? products.map((product) => {
        return JSON.stringify(product);
    }) : [];

    await cart.update({

        products: jsonProducts,

    });

    if (userId) {
        await user.update({
            idCart: cart.idCart
        });
        await cart.update({
            userId: user.id
        });
    }

    return cart;

};

module.exports = editCartController;
