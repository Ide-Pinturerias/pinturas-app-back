const { Users } = require('#DB_CONNECTION');
const { validateToken } = require('#SERVICES/jwt');

const getUsersController = async ({ token }) => {
  validateToken(token);
  const usersDb = await Users.findAll();
  const mappedUsers = usersDb.map(async (user) => {
    // Busco el carrito del usuario
    let idCart;

    const cart = await user.getCart();
    if (cart) {
      idCart = cart.dataValues.idCart;
    }

    return {
      id: user.id,
      email: user.email,
      rol: user.rol,
      name: user.name,
      lastName: user.lastName,
      address: user.address,
      locality: user.locality,
      province: user.province,
      phone: user.phone,
      image: user.image,
      idCart: idCart || null,
      active: user.active,
      authZero: user.authZero
    };
  });
  const users = await Promise.all(mappedUsers);
  return users;
};

module.exports = getUsersController;
