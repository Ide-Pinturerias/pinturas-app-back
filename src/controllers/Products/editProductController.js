const { Products, Providers } = require('../../db.js');
const calculatePrice = require("../../utils/calculatePrice.js");
const IVA = 21;

const editProductController = async (id, newProductData) => {
    // Buscar el producto a editar
    const productToEdit = await Products.findByPk(id);
    if (!productToEdit) throw Error("Producto no encontrado");

    if (productToEdit.patent !== newProductData.patent) {
        // Buscar nuevo proveedor
        const provider = await Providers.findOne({ where: { name: newProductData.patent } });
        if (!provider) throw Error('Proveedor no encontrado');

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
