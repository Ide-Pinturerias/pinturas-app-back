const { ProductsControllers } = require('../../controllers');
const { deleteProduct } = ProductsControllers;
const decodedToken = require("../../services/decodedJwt");

const deleteProductHandler = async (req, res) => {

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
        const deletedProduct = await deleteProduct(id);

        return res.status(200).json({
            "status": "success",
            "productDELETED": deletedProduct
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = deleteProductHandler;
