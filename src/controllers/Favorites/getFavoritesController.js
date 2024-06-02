const { Users } = require('#DB_CONNECTION');
const { USER_NOT_FOUND_ERROR, MISSING_PARAMS_ERROR } = require('#ERRORS');

const getFavoritesController = async ({ idUser }) => {
  if (!idUser) throw new MISSING_PARAMS_ERROR('Faltan parametros');
  // valido que el usuario exista
  const user = await Users.findByPk(idUser);
  if (!user) throw new USER_NOT_FOUND_ERROR('Usuario no encontrado');

  return await user.getProducts();
};

module.exports = getFavoritesController;
