const { UsersControllers } = require('#CONTROLLERS');
const { putUser } = UsersControllers;

const putUserHandler = async (req, res) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        error: "Falta el token de autorización"
    });

    try {
        const { id } = req.params;
        const result = await putUser(id, req.body);

        return res.status(200).json({ usuario: result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = putUserHandler;
