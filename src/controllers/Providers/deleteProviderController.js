const { Providers } = require("#DB_CONNECTION");
const decodedToken = require("#SERVICES/decodedJwt");
const {
    MISSING_PARAMS_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
    PROVIDER_NOT_FOUND_ERROR,
    PROVIDER_NOT_ACTIVE_ERROR
} = require("#ERRORS");

const deleteProviderController = async ({ providerId, token }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Falta token de autorizacion");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    if (!providerId) throw new MISSING_PARAMS_ERROR("Faltan parametros");

    const provider = await Providers.findByPk(providerId);

    if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Proveedor con id ${providerId} no encontrado`);

    if (provider.active != true) throw new PROVIDER_NOT_ACTIVE_ERROR(`Proveedor con id ${providerId} no activo`);

    await provider.update({ active: false });

    return provider.dataValues;
};

module.exports = deleteProviderController;
