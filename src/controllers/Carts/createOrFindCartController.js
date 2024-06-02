const { Carts, Users } = require('#DB_CONNECTION');
const { v4 } = require('uuid');

const { USER_NOT_FOUND_ERROR, MISSING_PARAMS_ERROR } = require('#ERRORS');

const createOrFindCartController = async ({ idUser }) => {
  if (!idUser) throw new MISSING_PARAMS_ERROR('Missing params');

  const user = await Users.findByPk(idUser) || null;
  if (!user) throw new USER_NOT_FOUND_ERROR(`User with id ${idUser} not found`);

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
