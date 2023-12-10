const { Providers } = require('#DB_CONNECTION');
const decodedToken = require("#SERVICES/decodedJwt");
const {
    MISSING_PARAMS_ERROR,
    PROVIDER_NOT_FOUND_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require("#ERRORS");

const getProviderByIdController = async ({ providerId, token }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Falta token de autorizacion");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    if (!providerId) throw new MISSING_PARAMS_ERROR("Faltan parametros");

    const provider = await Providers.findByPk(providerId);
    if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Proveedor con id ${providerId} no encontrado`);

    return provider;

};

module.exports = getProviderByIdController;
