const { ProductsControllers } = require('#CONTROLLERS');
const { destroyProduct } = ProductsControllers;

const destroyProductHandler = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const { productId } = req.body;
        const product = await destroyProduct({ productId, token });
        return res.status(200).json({
            "status": "success",
            "product": product
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = destroyProductHandler;
