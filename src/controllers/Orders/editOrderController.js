const { Orders } = require("#DB_CONNECTION");
const {
    MISSING_PARAMS_ERROR,
    ORDER_NOT_FOUND_ERROR
} = require("#ERRORS");

const editOrderController = async ({ orderId, orderContent }) => {

    if (!orderId || !orderContent) {
        throw new MISSING_PARAMS_ERROR("Missing params");
    }

    const orderToEdit = await Orders.findByPk(orderId);

    if (!orderToEdit) {
        throw new ORDER_NOT_FOUND_ERROR(`Order with id ${orderId} not found`);
    }

    await orderToEdit.update(orderContent);
    return orderToEdit;
};

module.exports = editOrderController;
