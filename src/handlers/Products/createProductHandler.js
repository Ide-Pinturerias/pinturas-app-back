const { ProductsControllers } = require('#CONTROLLERS');
const { createProduct } = ProductsControllers;

const createProductHandler = async (req, res) => {

    try {
        const token = req.header('Authorization');

        const createdProduct = await createProduct({
            product: req.body,
            token,
            file: req.file
        });

        return res.status(201).json({
            status: "success",
            message: "Producto creado exitosamente",
            product: createdProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }

};

module.exports = createProductHandler;
