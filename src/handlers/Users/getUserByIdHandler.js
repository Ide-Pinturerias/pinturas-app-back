const { UsersControllers } = require('#CONTROLLERS');
const { getUserById } = UsersControllers;

const getUserByIdHandler = async (req, res) => {
    // TODO: Agregar token de autenticación (?)
    try {
        const { id } = req.params;
        const user = await getUserById({ userId: id });
        return res.status(200).json({ usuario: user });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = getUserByIdHandler;
