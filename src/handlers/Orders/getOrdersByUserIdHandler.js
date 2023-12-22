const { OrdersControllers } = require("#CONTROLLERS");
const { getOrdersByUserId } = OrdersControllers;

const getOrdersByUserIdHandler = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await getOrdersByUserId({ userId });
        return res.status(200).json({
            status: "success",
            orders,
        });
    } catch (error) {
        console.error(`Error getting orders by userId: ${error.message}`);
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = getOrdersByUserIdHandler;
