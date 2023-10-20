const { ProvidersControllers } = require('../../controllers');
const { getProviders } = ProvidersControllers;
const decodedToken = require("../../services/decodedJwt");

const getProvidersHandler = async (req, res) => {

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
        return res.status(200).json(await getProviders());
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

module.exports = getProvidersHandler;
