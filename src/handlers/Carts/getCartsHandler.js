const { CartsControllers } = require('#CONTROLLERS');
const { getCarts } = CartsControllers;

const getCartsHandler = async (_req, res) => {

    try {

        const carts = await getCarts();

        return res.status(200).json({
            status: 'success',
            carts,
        });

    }

    catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });
    }

};

module.exports = getCartsHandler;
