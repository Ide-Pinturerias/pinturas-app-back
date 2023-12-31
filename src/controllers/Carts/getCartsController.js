const { Carts } = require('#DB_CONNECTION');

const getCartsController = async () => {
  const carts = await Carts.findAll();

  return carts.map((cart) => {
    return {

      idCart: cart.idCart,
      idUser: cart.userId,
      products: cart.products

    };
  });
};

module.exports = getCartsController;
