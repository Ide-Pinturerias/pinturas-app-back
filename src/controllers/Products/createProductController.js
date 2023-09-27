const { Products, Providers } = require('../../db.js');
const calculatePrice = require("../../utils/calculatePrice.js");
const IVA = 21;

const createProductController = async (product) => {
    const provider = await Providers.findOne({ where: { name: product.patent } });

    if (!provider) throw Error('Provider not found');

    const productCreated = await Products.create({
        ...product, providerId: provider.id
    });
    await productCreated.update({
        price: calculatePrice(productCreated.price, provider.discount, IVA, provider.markup),
    });
    return productCreated.dataValues;
};

module.exports = createProductController;
