const { Users } = require('#DB_CONNECTION');
const { createToken } = require('#SERVICES/jwt');

const registerAuthZeroController = async (user) => {
  let findUser = await Users.findOne({

    where: {

      email: user.email

    }

  });

  if (!findUser) {
    findUser = await Users.create({

      email: user.email,
      rol: 'client',
      name: user.given_name,
      lastName: user.family_name,
      image: user.picture,
      authZero: 'true'

    });
  }

  const userToValidate = { ...findUser.dataValues };

  if (userToValidate.active === false) throw Error('El usuario ha sido eliminado');

  const userToToken = {

    email: user.email,
    name: user.given_name,
    rol: user.rol ? user.rol : 'client'

  };

  const token = createToken(userToToken);

  return {

    user: findUser,
    token

  };
};

module.exports = registerAuthZeroController;
