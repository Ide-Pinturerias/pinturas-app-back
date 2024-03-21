const bcrypt = require('bcrypt');
const { Users } = require('#DB_CONNECTION');
const { createToken } = require('#SERVICES/jwt');
const {
  MISSING_PARAMS_ERROR,
  DELETED_USER_ERROR,
  USER_NOT_FOUND_ERROR
} = require('#ERRORS');

const loginUsersController = async ({ email, password }) => {
  if (!email && !password) throw new MISSING_PARAMS_ERROR('Missing params');

  const findUser = await Users.findOne({ where: { email } });

  if (!findUser) {
    throw new USER_NOT_FOUND_ERROR(`User with email ${email} not found`);
  }

  if (findUser.dataValues.active === false) {
    throw new DELETED_USER_ERROR(`The user ${email} is deleted`);
  }

  let user, token, userToToken;

  if (findUser) {
    const pwdMatch = bcrypt.compareSync(password, findUser.password);

    if (pwdMatch) {
      delete findUser.dataValues.password;

      userToToken = {
        id: findUser.dataValues.id,
        email: findUser.dataValues.email,
        name: findUser.dataValues.name,
        rol: findUser.dataValues.rol
      };

      token = createToken(userToToken);

      user = findUser;
    }
  }
  return { user, token };
};

module.exports = loginUsersController;
