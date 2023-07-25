const { UsersControllers } = require('../../controllers');
const { registerUser } = UsersControllers;


const registerUserHandler = async (req, res) => {

    //Recoger datos de la petición
    const { email, password, rol, name, lastname, adress } = req.body;

    //Comprobar que me llegan bien los datos(validacion)
    //Respuesta "clara" o personalizada de ususarios duplicados(pendiente)

    if (!email || !password || !rol) {

        return res.status(400).json({

            status: "error",
            message: "Faltan datos por enviar"

        });

    }

    try {

        const newUser = await registerUser(email, password, rol);

        return res.status(200).json({

            status: "success",
            user: newUser
        });

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }

};

module.exports = registerUserHandler;
