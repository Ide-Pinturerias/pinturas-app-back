const { Orders, Products } = require('#DB_CONNECTION');

const {
  ORDER_NOT_FOUND_ERROR,
  PRODUCT_NOT_FOUND_ERROR
} = require('#ERRORS');

const webHookController = async ({ idOrder, action, bodySTR, querySTR }) => {
  const order = await Orders.findByPk(idOrder);
  // const { meliBody: prevBody, meliQuery: prevQuery } = order;
  if (!order) {
    throw new ORDER_NOT_FOUND_ERROR(`Order with id ${idOrder} not found`);
  }

  if (action === 'payment.created') {
    // update products stock
    const parsedProducts = JSON.parse(order.products);

    const { ids, qus } = parsedProducts;

    for (let i = 0; i < ids.length; i++) {
      const product = await Products.findByPk(ids[i]);
      if (!product) {
        throw new PRODUCT_NOT_FOUND_ERROR(`Product with id ${ids[i]} not found`);
      }
      await product.update({ stock: Math.max(0, product.stock - qus[i]) });
    }

    await order.update({
      meliBody: bodySTR,
      meliQuery: querySTR
    });
    // console.info(`Fields created for order ${idOrder}`);

    // Actualizamos el estado de la orden a pagada
    await order.update({
      state: 'paid'
    });
  }

  return order;
};

module.exports = webHookController;
