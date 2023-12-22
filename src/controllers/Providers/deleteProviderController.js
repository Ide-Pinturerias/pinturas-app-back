const { Providers } = require("#DB_CONNECTION");
const { validateToken } = require("#SERVICES/jwt");
const {
    MISSING_PARAMS_ERROR,
    PROVIDER_NOT_FOUND_ERROR,
    PROVIDER_NOT_ACTIVE_ERROR
} = require("#ERRORS");

const deleteProviderController = async ({ providerId, token }) => {

    validateToken(token);

    if (!providerId) throw new MISSING_PARAMS_ERROR('Missing params');

    const provider = await Providers.findByPk(providerId);

    if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Provider with id ${providerId} not found`);

    if (provider.active != true) throw new PROVIDER_NOT_ACTIVE_ERROR(`Provider with id ${providerId} is not active`);

    await provider.update({ active: false });

    return provider.dataValues;
};

module.exports = deleteProviderController;
