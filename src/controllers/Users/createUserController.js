const { Users } = require('#DB_CONNECTION');
const bcrypt = require('bcrypt');
const { MISSING_PARAMS_ERROR, INVALID_PASSWORD_ERROR } = require('#ERRORS');
const { PASSWORD_REGEX } = require('#CONSTANTS');

const createUserController = async ({ user }) => {
  let { email, password, name, lastName, address, locality, province, phone } = user;

  if (!email && !password) {
    throw new MISSING_PARAMS_ERROR('Missing params');
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new INVALID_PASSWORD_ERROR('Invalid password');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;

  const newUser = await Users.create({
    email,
    password,
    rol: 'client',
    name,
    lastName,
    address,
    locality,
    province,
    phone
  });

  return {
    id: newUser.id,
    email: newUser.email,
    rol: newUser.rol
  };
};

module.exports = createUserController;
