const { Users } = require('#DB_CONNECTION');
const { validateToken } = require('#SERVICES/jwt');
const {
  USER_NOT_FOUND_ERROR,
  MISSING_PARAMS_ERROR
} = require('#ERRORS');

const deleteUserController = async ({ userId, token }) => {
  validateToken(token);

  if (!userId) throw new MISSING_PARAMS_ERROR('Missing params');

  const user = await Users.findByPk(userId);

  if (!user) throw new USER_NOT_FOUND_ERROR(`User with id ${userId} not found`);

  await user.update({ active: false });
  // TODO: Check if this is necessary or if there is a better way to do it ↓
  delete user.dataValues.password;
  return user.dataValues;
};

module.exports = deleteUserController;
