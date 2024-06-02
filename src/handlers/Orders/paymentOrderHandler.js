const { OrdersControllers } = require('#CONTROLLERS');
const { paymentOrder } = OrdersControllers;

const paymentOrderHandler = async (req, res) => {
  try {
    const { idOrder } = req.body;
    const preference = await paymentOrder({ orderId: idOrder });
    return res.status(200).json({
      status: 'success',
      preference
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = paymentOrderHandler;
