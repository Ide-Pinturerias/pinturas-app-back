const { ProvidersControllers } = require('../../controllers');
const { createProvider } = ProvidersControllers;
const decodedToken = require("../../services/decodedJwt");

const createProviderHandler = async (req, res) => {

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

        const { name, discount, markup } = req.body;
        if (!name || !discount || !markup) return res.status(400).json({ error: "Faltan datos" });

        return res.status(200).jason(await createProvider(name, discount, markup));

    } catch (error) {
        if (error.errors[0].type == "unique violation") { //cuando queremos crear un provedor cuyo nombre ya existe
            return res.status(404).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ error: error.message });
    }
};

module.exports = createProviderHandler;
