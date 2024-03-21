const { UsersControllers } = require('#CONTROLLERS');
const { loginUsers } = UsersControllers;

const loginUsersHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUsers({ email, password });

    if (user && token) {
      // Devolver datos
      return res.status(200).json({

        status: 'success',
        mensaje: 'Te has identificado exitosamente',
        acceso: {

          user,
          token

        }

      });
    } else {
      return res.status(400).send({

        status: 'error',
        mensaje: 'La datos proporcionados no coinciden'

      });
    }
  } catch (error) {
    console.error('Error en loginUsersHandler: \n', error);

    return res.status(error.status || 500).json({

      name: error.name,
      message: error.message

    });
  }
};

module.exports = loginUsersHandler;
