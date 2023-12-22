const { OrdersControllers } = require("#CONTROLLERS");
const { destroyOrder } = OrdersControllers;

const destroyOrderHandler = async (req, res) => {

    try {

        const { orderId } = req.body;

        const order = await destroyOrder({ orderId });

        return res.status(200).json({
            status: "success",
            order,
        });

    } catch (error) {

        console.error(`Error destroying order: ${error.message}`);
        console.error(error);

        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });

    }

};

module.exports = destroyOrderHandler;
