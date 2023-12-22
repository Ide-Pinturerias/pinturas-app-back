const { UsersControllers } = require('#CONTROLLERS');
const { deleteUser } = UsersControllers;

const deleteUserHandler = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const { id } = req.params;
        const user = await deleteUser({ userId: id, token });
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

module.exports = deleteUserHandler;
