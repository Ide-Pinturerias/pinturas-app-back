const { Carts } = require('#DB_CONNECTION');
const createOrder = require('./createOrderController');
const {
  MISSING_PARAMS_ERROR,
  CART_NOT_FOUND_ERROR
} = require('#ERRORS');

const formatProductsCart = (stringProducts) => {
  try {
    const arrayProducts = JSON.parse(stringProducts);
    const objectProducts = arrayProducts.reduce((acc, product) => {
      // Extraer valores de las claves "id" y "quantity" del product
      const { id, quantity } = product;

      // Agregar el valor de "id" al array "ids"
      acc.ids.push(Number(id));

      // Agregar el valor de "quantity" al array "qus"
      acc.qus.push(quantity);

      return acc;
    }, { ids: [], qus: [] });

    return objectProducts;
  } catch (error) {
    console.info('Error formatting products');
    console.error(error);
  }
};

const creatOrderByCartIdController = async ({ idCart }) => {
  if (!idCart) throw new MISSING_PARAMS_ERROR('Missing params');

  const cart = await Carts.findOne({ where: { idCart } });

  if (!cart) {
    throw new CART_NOT_FOUND_ERROR(`Cart with id ${idCart} not found`);
  }

  const { products, userId } = cart;

  const productsFormated = formatProductsCart(products);

  const order = createOrder({ products: productsFormated, idUser: userId });

  return order;
};

module.exports = creatOrderByCartIdController;
