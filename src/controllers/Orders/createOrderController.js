const { Orders, Users } = require("#DB_CONNECTION");

const createOrderController = async (products, idUser) => {

    const userOrder = await Users.findByPk(idUser);
    if (!userOrder) throw Error("Error: Usuario no encontrado");
    let total = 0;

    const parsedProducts = products.map(product => {
        const jsonProduct = JSON.parse(product);
        total += jsonProduct.price * jsonProduct.quantity;
        return typeof product === 'string' ? product : JSON.stringify(product);
    });

    const order = await Orders.create({
        products: parsedProducts,
        total,
    });
    await userOrder.addOrder(order);

    return await Orders.findByPk(order.id);

};

module.exports = createOrderController;
