const { Users } = require("#DB_CONNECTION");

const getBlogsByIdController = async (userId) => {
    const user = await Users.findByPk(userId);
    if (!user) throw Error("Usuario no encontrado");

    return await user.getOrders();
};

module.exports = getBlogsByIdController;
