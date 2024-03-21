const { OrdersControllers } = require('#CONTROLLERS');
const { successOrder } = OrdersControllers;

const successOrderHandler = async (req, res) => {
  try {
    const { idOrder } = req.params;
    const succededOrder = await successOrder({ idOrder });
    return res.status(200).json({
      status: 'success',
      order: succededOrder
    });
  } catch (error) {
    console.info('Error while succeding order:');
    console.error(error);
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = successOrderHandler;
