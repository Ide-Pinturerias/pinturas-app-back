const { CartsControllers } = require('../../controllers');
const { editCart } = CartsControllers;

const editCartHandler = async (req, res) => {

    try {

        const { userId, idCart, products } = req.body;

        if (!userId && !idCart) {

            return res.status(400).json({
                status: 'fail',
                message: 'You must provide an idCart or an userId',
            });

        }

        const editedCart = await editCart({ userId, idCart, products });

        return res.status(200).json(editedCart);

    }
    catch (error) {

        console.error(error);

        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });

    }

};

module.exports = editCartHandler;
