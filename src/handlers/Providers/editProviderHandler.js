const { ProvidersControllers } = require('../../controllers');
const { editProvider } = ProvidersControllers;
const decodedToken = require("../../services/decodedJwt");

const editProviderHandler = async (req, res) => {

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

        const { id } = req.params;
        const { name, discount, markup } = req.body;
        if (!id || !name || !discount || !markup) {
            return res.status(400).json({ message: "faltan datos" });
        }
        return res.status(200).json(await editProvider(id, req.body));
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
};

module.exports = editProviderHandler;
