const { ProductsControllers } = require('#CONTROLLERS');
const { filterAndOrderProducts } = ProductsControllers;

const getAllProductsHandler = async (req, res) => {
  try {
    const {
      name, category,
      lowPrice, highPrice,
      minRating, maxRating,
      minStock, maxStock,
      limit, page,
      color, active,
      sortBy, orderBy
    } = req.query;

    const filteredProducts = await filterAndOrderProducts({
      name,
      category,
      lowPrice,
      highPrice,
      minRating,
      maxRating,
      minStock,
      maxStock,
      limit,
      page,
      color,
      active,
      sortBy,
      orderBy
    });

    return res.status(200).json(filteredProducts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllProductsHandler;
