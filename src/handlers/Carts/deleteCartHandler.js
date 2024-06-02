const { CartsControllers } = require('#CONTROLLERS');
const { deleteCart } = CartsControllers;

const deleteCartHandler = async (req, res) => {
  const { idUser, idCart } = req.body;

  try {
    const cart = await deleteCart({ idUser, idCart });

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);

    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = deleteCartHandler;
