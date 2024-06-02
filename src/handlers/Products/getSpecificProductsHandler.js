const { ProductsControllers } = require('#CONTROLLERS');
const { getSpecificProducts } = ProductsControllers;

const getSpecificProductsHandler = async (req, res) => {
  try {
    const { specificProducts } = req.body;
    const products = await getSpecificProducts(specificProducts);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getSpecificProductsHandler;
