const { Orders } = require('#DB_CONNECTION');

const getOrdersController = async ({ idUser, state, idOrder }) => {
  const searchCondition = {};
  if (idUser) searchCondition.userId = idUser;
  if (state) searchCondition.state = state;
  if (idOrder) searchCondition.id = idOrder;

  const orders = await Orders.findAll({ where: searchCondition });

  return orders;
};

module.exports = getOrdersController;
