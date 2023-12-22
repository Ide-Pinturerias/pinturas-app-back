const { ProductsControllers } = require('#CONTROLLERS');
const { editProduct } = ProductsControllers;

const editProductHandler = async (req, res) => {

    try {

        const token = req.header('Authorization');
        const { id } = req.params;

        const product = await editProduct({
            productId: id,
            newProductData: req.body,
            token,
            file: req.file
        });

        return res.status(201).json({
            status: "success",
            message: "Producto editado exitosamente",
            product: product
        });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }

};

module.exports = editProductHandler;
