const { Orders } = require('#DB_CONNECTION');

const getOrdersController = async ({ idUser, state, idOrder }) => {

    // These are optional params
    // if (!idUser && !state && !idOrder) {
    //     throw new MISSING_PARAMS_ERROR('Missing params');
    // }

    const searchCondition = {};
    idUser ? searchCondition.userId = idUser : null;
    state ? searchCondition.state = state : null;
    idOrder ? searchCondition.id = idOrder : null;

    const orders = await Orders.findAll({ where: searchCondition });

    return orders;

};

module.exports = getOrdersController;
