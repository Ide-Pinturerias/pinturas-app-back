const { ProductsControllers } = require('#CONTROLLERS');
const { getAllProducts } = ProductsControllers;

const getAllProductsNoFilterHandler = async (_req, res) => {

    try {

        const productsNoFilter = await getAllProducts();

        return res.status(200).json(productsNoFilter);

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });
    }

};

module.exports = getAllProductsNoFilterHandler;
