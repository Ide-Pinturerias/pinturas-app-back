const { CartsControllers } = require('#CONTROLLERS');
const { getCart } = CartsControllers;

const getCartHandler = async (req, res) => {
  try {
    const { idCart, idUser } = req.query;
    const cart = await getCart({ idCart, idUser });
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = getCartHandler;
