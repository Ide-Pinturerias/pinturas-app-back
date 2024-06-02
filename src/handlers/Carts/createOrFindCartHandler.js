const { CartsControllers } = require('#CONTROLLERS');
const { createOrFindCart } = CartsControllers;

const createOrFindCartHandler = async (req, res) => {
  try {
    const { idUser } = req.body;

    const cart = await createOrFindCart({ idUser });

    return res.status(201).json(cart);
  } catch (error) {
    console.error(error);

    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = createOrFindCartHandler;
