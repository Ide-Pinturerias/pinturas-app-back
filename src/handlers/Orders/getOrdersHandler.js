const { OrdersControllers } = require("#CONTROLLERS");
const { getOrders } = OrdersControllers;

const getOrdersHandler = async (req, res) => {

    try {
        const { idUser, state, idOrder } = req.query;
        const orders = await getOrders({ idUser, state, idOrder });
        return res.status(200).json({
            status: 'success',
            orders
        });
    } catch (error) {
        console.error(`Error getting orders: ${error.message}`);
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });
    }

};

module.exports = getOrdersHandler;
