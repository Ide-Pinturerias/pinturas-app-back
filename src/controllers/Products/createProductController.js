const { Products, Providers } = require('#DB_CONNECTION');
const calculatePrice = require('#UTILS/calculatePrice');
const { uploadImage } = require('#SERVICES/cloudinary');
const { validateToken } = require('#SERVICES/jwt');
const {
  PROVIDER_NOT_FOUND_ERROR,
  MISSING_PARAMS_ERROR
} = require('#ERRORS');
const { IVA } = require('#CONSTANTS');

const createProductController = async ({ product, token, file }) => {
  validateToken(token);

  if (!product || !product.name || !product.price || !product.patent) throw new MISSING_PARAMS_ERROR('Missing params');

  const provider = await Providers.findOne({ where: { name: product.patent } });

  if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Provider with name ${product.patent} not found`);

  if (file) {
    const image = await uploadImage(file);
    product.image = image;
  }

  const productCreated = await Products.create({
    ...product, providerId: provider.id
  });

  await productCreated.update({
    price: calculatePrice(productCreated.price, provider.discount, IVA, provider.markup)
  });
  return productCreated.dataValues;
};

module.exports = createProductController;
