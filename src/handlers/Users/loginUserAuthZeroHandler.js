const { UsersControllers } = require('#CONTROLLERS');
const { loginAuthZero } = UsersControllers;

const loginUserAuthZeroHandler = async (req, res) => {
  try {
    const user = req.body;
    const verifyUserAuthZero = await loginAuthZero({ user });

    return res.status(200).json({

      status: 'success',
      mensaje: 'Te has identificado exitosamente',
      acceso: verifyUserAuthZero

    });
  } catch (error) {
    console.error('Error en loginUserAuthZeroHandler: \n', error);

    return res.status(error.status || 500).json({

      name: error.name,
      message: error.message

    });
  }
};

module.exports = loginUserAuthZeroHandler;
