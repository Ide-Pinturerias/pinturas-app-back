const { ProductsControllers } = require('#CONTROLLERS');
const { getProductById } = ProductsControllers;

const getProductByIdHandler = async (req, res) => {

    try {
        const { id } = req.params;
        const product = await getProductById({ productId: id });

        return res.status(200).json({
            "status": "success",
            "product": product
        });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });
    }

};

module.exports = getProductByIdHandler;
