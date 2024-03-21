const { OrdersControllers } = require('#CONTROLLERS');
const { createOrderByCartId } = OrdersControllers;

const createOrderByCartIdHandler = async (req, res) => {
  try {
    const { idCart } = req.body;
    const createdOrder = await createOrderByCartId({ idCart });
    return res.status(200).json({
      status: 'success',
      order: createdOrder
    });
  } catch (error) {
    console.error(`Error creating order by cartId: ${error.message}`);
    console.error(error);
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = createOrderByCartIdHandler;
