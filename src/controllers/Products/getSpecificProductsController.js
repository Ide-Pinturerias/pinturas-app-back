const { Products } = require('#DB_CONNECTION');

const getSpecificProductsController = async (specificProducts) => {
  const products = [];
  for (const element of specificProducts) {
    const product = await Products.findByPk(element.id);
    if (product) {
      // si recibo cantidades ademas de ids, las agrego a las propiedades de producto
      if (element.quantity !== undefined) {
        product.dataValues.quantity = element.quantity;
      }
      products.push(product);
    }
  }
  return products;
};

module.exports = getSpecificProductsController;
