const { Products } = require('#DB_CONNECTION');

const getProductByIdController = async (id) => {
    const product = await Products.findByPk(id);
    return product;
};

module.exports = getProductByIdController;
