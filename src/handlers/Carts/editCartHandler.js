const { CartsControllers } = require('#CONTROLLERS');
const { editCart } = CartsControllers;

const editCartHandler = async (req, res) => {
  try {
    const { idUser, idCart, products } = req.body;

    const editedCart = await editCart({ idUser, idCart, products });

    return res.status(200).json(editedCart);
  } catch (error) {
    console.error(error);

    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = editCartHandler;
