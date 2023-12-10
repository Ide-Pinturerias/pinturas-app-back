const { Products, Providers } = require('#DB_CONNECTION');
const calculatePrice = require("#UTILS/calculatePrice");
const decodedToken = require("#SERVICES/decodedJwt");
const { IVA } = require("#CONSTANTS");
const { uploadImage } = require("#SERVICES/cloudinary");
const {
    MISSING_PARAMS_ERROR, PRODUCT_NOT_FOUND_ERROR, PROVIDER_NOT_FOUND_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR, INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require('#ERRORS');

const editProductController = async ({ productId, newProductData, token, file }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Falta token de autorizacion");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    if (!productId || !newProductData) throw new MISSING_PARAMS_ERROR("Faltan parametros");
    // Buscar el producto a editar
    const productToEdit = await Products.findByPk(productId);
    if (!productToEdit) throw new PRODUCT_NOT_FOUND_ERROR(`Producto con id ${productId} no encontrado`);

    // Si se envio una imagen, subirla a cloudinary y guardar la url en el
    // producto
    if (file) {
        const image = await uploadImage(file);
        newProductData.image = image.url;
    }

    if (productToEdit.patent !== newProductData.patent) {
        // Buscar nuevo proveedor
        const provider = await Providers.findOne({ where: { name: newProductData.patent } });
        if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Proveedor con nombre ${newProductData.patent} no encontrado`);

        //Actualizar producto con nuevos datos y cambio de proveedor
        await productToEdit.update({
            ...newProductData,
            providerId: provider.id,
            price: calculatePrice(newProductData.price, provider.discount, IVA, provider.markup),
        });
    } else {
        //actualizar producto con nuevos datos
        await productToEdit.update({ ...newProductData });
    }

    return productToEdit.dataValues;
};

module.exports = editProductController;
