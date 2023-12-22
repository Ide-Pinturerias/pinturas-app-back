const { OrdersControllers } = require("#CONTROLLERS");
const { editOrder } = OrdersControllers;

const editOrderHandler = async (req, res) => {
    try {
        const { idOrder } = req.params;
        const orderContent = req.body;
        const editedOrder = await editOrder({
            orderId: idOrder,
            orderContent: orderContent,
        });

        return res.status(201).json({
            status: "success",
            message: "Orden editada exitosamente",
            order: editedOrder,
        });
    } catch (error) {
        console.error(`Error editing order: ${error.message}`);
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = editOrderHandler;
