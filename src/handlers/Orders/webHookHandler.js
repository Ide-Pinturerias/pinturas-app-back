const { OrdersControllers } = require('#CONTROLLERS');
const { webHook } = OrdersControllers;

const webHookHandler = async (req, res) => {
  try {
    const { body, query, params } = req;
    const { idOrder } = params;

    const bodySTR = JSON.stringify(body);
    const querySTR = JSON.stringify(query);

    const orderResult = webHook({
      idOrder,
      action: req.body.action,
      bodySTR,
      querySTR
    });

    res.status(200).send({
      status: 'success',
      order: orderResult
    });
  } catch (error) {
    console.error(`Error handling webhook: ${error.message}`);
    console.error(error);
  }
};

module.exports = webHookHandler;
