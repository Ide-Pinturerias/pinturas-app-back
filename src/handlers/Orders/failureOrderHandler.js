const { OrdersControllers } = require("#CONTROLLERS");
const { failureOrder } = OrdersControllers;


const failureOrderHandler = async (req, res) => {

    try {
        const { idOrder } = req.params;
        const result = await failureOrder({ idOrder });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};


module.exports = failureOrderHandler;
