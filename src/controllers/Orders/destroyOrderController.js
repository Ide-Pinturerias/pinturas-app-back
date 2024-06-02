const { Orders } = require('#DB_CONNECTION');
const {
  MISSING_PARAMS_ERROR,
  ORDER_NOT_FOUND_ERROR
} = require('#ERRORS');

const destroyOrderController = async ({ orderId }) => {
  if (!orderId) throw new MISSING_PARAMS_ERROR('Missing params');

  const order = await Orders.findOne({ where: { id: orderId } });

  if (!order) {
    throw new ORDER_NOT_FOUND_ERROR(`Order with id ${orderId} not found`);
  }

  await order.destroy();

  return order;
};

module.exports = destroyOrderController;
