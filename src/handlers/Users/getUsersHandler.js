const { UsersControllers } = require('../../controllers');
const { getUsers } = UsersControllers;
const decodedToken = require("../../services/decodedJwt");

const getUsersHandler = async (req, res) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        error: "Falta el token de autorización"
    });

    try {
        const authorization = decodedToken(token);
        if (authorization.rol !== "admin") {

            return res.status(403).json({
                error: "No cuentas con los permisos para esta sección"
            });
        }
        const users = await getUsers();

        return res.status(200).json({
            status: "success",
            users
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = getUsersHandler;
