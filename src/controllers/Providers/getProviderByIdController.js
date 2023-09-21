const { Providers } = require('../../db');
const getProviderByIdController = async (id) => {

    const provider = await Providers.findByPk(id);
    if (!provider) throw Error("PROVEEDOR NO ENCONTRADO");

    return provider;

};

module.exports = getProviderByIdController;
