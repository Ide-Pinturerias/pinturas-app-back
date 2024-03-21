const { Orders } = require('#DB_CONNECTION');
const {
  MISSING_PARAMS_ERROR,
  ORDER_NOT_FOUND_ERROR
} = require('#ERRORS');

const successOrderController = async ({ idOrder }) => {
  if (!idOrder) throw new MISSING_PARAMS_ERROR('Missing params');

  const completedOrder = await Orders.findByPk(idOrder);
  if (!completedOrder) {
    throw new ORDER_NOT_FOUND_ERROR(`Order with id ${idOrder} not found`);
  }
  await completedOrder.update({ state: 'paid' });

  return completedOrder;
};

module.exports = successOrderController;
