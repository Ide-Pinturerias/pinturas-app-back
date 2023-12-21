const { UsersControllers } = require('#CONTROLLERS');
const { getUserById } = UsersControllers;

const getUserByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header('Authorization');
        const user = await getUserById({ userId: id, token });
        return res.status(200).json({
            usuario: user
        });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = getUserByIdHandler;
