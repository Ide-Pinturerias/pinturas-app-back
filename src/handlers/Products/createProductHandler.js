const { ProductsControllers } = require('../../controllers');
const { createProduct } = ProductsControllers;
const { uploadImage } = require('../../services/cloudinary');
const decodedToken = require("../../services/decodedJwt");

const createProductHandler = async (req, res) => {

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

        if (req.file) {

            const secure_url = await uploadImage(req.file);

            req.body.image = secure_url;

        }

        const postProduct = await createProduct(req.body);

        return res.status(201).json({
            status: "success",
            message: "Producto creado exitosamente",
            product: postProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

};

module.exports = createProductHandler;
