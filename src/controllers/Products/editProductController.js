const { Products, Providers } = require('#DB_CONNECTION');
const calculatePrice = require('#UTILS/calculatePrice');
const { validateToken } = require('#SERVICES/jwt');
const { IVA } = require('#CONSTANTS');
const { uploadImage } = require('#SERVICES/cloudinary');
const {
  MISSING_PARAMS_ERROR, PRODUCT_NOT_FOUND_ERROR, PROVIDER_NOT_FOUND_ERROR
} = require('#ERRORS');

const editProductController = async ({ productId, newProductData, token, file }) => {
  // Validar token
  validateToken(token);

  if (!productId || !newProductData || !newProductData.patent) throw new MISSING_PARAMS_ERROR('Faltan parametros');
  // Buscar el producto a editar
  const productToEdit = await Products.findByPk(productId);
  if (!productToEdit) throw new PRODUCT_NOT_FOUND_ERROR(`Producto con id ${productId} no encontrado`);

  // Si se envio una imagen, subirla a cloudinary y guardar la url en el
  // producto
  if (file) {
    const image = await uploadImage(file);
    newProductData.image = image;
  }

  if (productToEdit.patent !== newProductData.patent) {
    // Buscar nuevo proveedor
    const provider = await Providers.findOne({ where: { name: newProductData.patent } });
    if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Proveedor con nombre ${newProductData.patent} no encontrado`);

    // Actualizar producto con nuevos datos y cambio de proveedor
    await productToEdit.update({
      ...newProductData,
      providerId: provider.id,
      price: calculatePrice(newProductData.price, provider.discount, IVA, provider.markup)
    });
  } else {
    // actualizar producto con nuevos datos
    await productToEdit.update({ ...newProductData });
  }

  return productToEdit.dataValues;
};

module.exports = editProductController;
