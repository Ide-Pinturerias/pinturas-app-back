const { CartsControllers } = require('../../controllers');
const { createOrFindCart } = CartsControllers;

const createOrFindCartHandler = async (req, res) => {

    try {

        const { idUser } = req.body;

        const cart = await createOrFindCart({ idUser });

        return res.status(200).json(cart);
    }

    catch (error) {

        console.error(error);

        console.log('error.status: ', error.status);
        console.log('error.message: ', error.message);

        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });

    }

};

module.exports = createOrFindCartHandler;
