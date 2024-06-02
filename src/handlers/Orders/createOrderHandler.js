const { OrdersControllers } = require('#CONTROLLERS');
const { createOrder } = OrdersControllers;

const createOrderHandler = async (req, res) => {
  try {
    const { products, idUser } = req.body;
    const createdOrder = await createOrder({ products, idUser });
    return res.status(200).json({
      status: 'success',
      order: createdOrder
    });
  } catch (error) {
    console.error(`Error creating order: ${error.message}`);
    console.error(error);
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = createOrderHandler;
