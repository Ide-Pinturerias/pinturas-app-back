const { Products, Providers } = require('#DB_CONNECTION');
const calculatePrice = require("#UTILS/calculatePrice");
const { uploadImage } = require("#SERVICES/cloudinary");
const decodedToken = require("#SERVICES/decodedJwt");
const {
    PROVIDER_NOT_FOUND_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require("#ERRORS");
const { IVA } = require("#CONSTANTS");

const createProductController = async ({ product, token, file }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Falta token de autorizacion");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    const provider = await Providers.findOne({ where: { name: product.patent } });

    if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Provider with name ${product.patent} not found`);

    if (file) {
        const image = await uploadImage(file);
        product.image = image.url;
    }

    const productCreated = await Products.create({
        ...product, providerId: provider.id
    });

    await productCreated.update({
        price: calculatePrice(productCreated.price, provider.discount, IVA, provider.markup),
    });
    return productCreated.dataValues;
};

module.exports = createProductController;
