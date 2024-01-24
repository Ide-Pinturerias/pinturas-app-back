const { OrdersControllers } = require('#CONTROLLERS');
const { webHook } = OrdersControllers;

const webHookHandler = async (req, res) => {
  try {
    const { body, query, params } = req;
    const { idOrder } = params;

    const bodySTR = JSON.stringify(body);
    const querySTR = JSON.stringify(query);

    const orderResult = await webHook({
      idOrder,
      action: req.body.action,
      bodySTR,
      querySTR
    });

    res.status(200).json({
      status: 'success',
      order: orderResult
    });
  } catch (error) {
    console.info('Error handling webhook');
    console.error(error);
    res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = webHookHandler;
