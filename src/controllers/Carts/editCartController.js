const { Carts } = require('../../db');


class BadFormatJSON extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'BadFormatJSON';
        this.status = status;
    }
}

// class NoUserFound extends Error {
//     constructor(message, status) {
//         super(message);
//         this.name = 'NoUserFound';
//         this.status = status;
//     }
// }

class NoCartFound extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'NoCartFound';
        this.status = status;
    }
}


const editCartController = async ({ userId, idCart, products }) => {

    // console.log('userId: ', userId);
    // console.log('idCart: ', idCart);
    // console.log('products: ', products);

    // const user = userId && await Users.findOne({
    //     where: {
    //         id: userId
    //     }
    // });

    const cart = idCart ? await Carts.findOne({
        where: {
            idCart
        }
    }) : await Carts.findOne({
        where: {
            userId
        }
    });

    // if (!user) {
    //     throw new NoUserFound('No user found', 404);
    // }

    if (!cart) {
        throw new NoCartFound('No cart found', 404);
    }

    try {
        JSON.parse(products);
    }
    catch (error) {
        throw new BadFormatJSON('Bad format JSON', 400);
    }

    const newCart = await cart.update({
        products
    });

    return newCart;

};

module.exports = editCartController;
