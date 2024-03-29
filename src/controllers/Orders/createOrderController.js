const { Orders, Users, Products } = require('#DB_CONNECTION');
const {
  MISSING_PARAMS_ERROR,
  USER_NOT_FOUND_ERROR,
  BAD_FORMAT_JSON_ERROR,
  PRODUCT_NOT_FOUND_ERROR
} = require('#ERRORS');

const getTotal = async (products) => {
  // "products": "{\"ids\":[1,2,3],\"qus\":[1,2,3]}"
  try {
    const { ids, qus } = JSON.parse(products);
    if (ids.length !== qus.length) {
      throw new BAD_FORMAT_JSON_ERROR('Bad format json');
    }
    const productsToGet = (await Products.findAll({ where: { idProduct: ids } })).map((product) => product.dataValues);
    // if some product is not found in the database, throw an error
    productsToGet.forEach((product) => {
      if (!product) {
        throw new PRODUCT_NOT_FOUND_ERROR(`Product with id ${product.id} not found`);
      }
    });
    let total = 0;
    productsToGet.forEach((product, index) => {
      const q = qus[index];
      if (isNaN(q) || q < 0) {
        throw new BAD_FORMAT_JSON_ERROR('Bad format json');
      }
      total += product.price * qus[index];
    });
    return total;
  } catch (error) {
    console.info('Error al calcular el total de la orden');
    console.error(error);
    throw new BAD_FORMAT_JSON_ERROR('Bad format json');
  }
};

const createOrderController = async ({ products, idUser }) => {
  if (!products || !idUser) throw new MISSING_PARAMS_ERROR('Missing params');

  const userOrder = await Users.findByPk(idUser);

  if (!userOrder) {
    throw new USER_NOT_FOUND_ERROR(`User with id ${idUser} not found`);
  }

  const total = await getTotal(products);

  const order = await Orders.create({
    products,
    total
  });

  await userOrder.addOrder(order);

  await order.reload();

  return order;
};

module.exports = createOrderController;
