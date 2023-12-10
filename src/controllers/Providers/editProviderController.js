const { Providers } = require("#DB_CONNECTION");
const decodedToken = require("#SERVICES/decodedJwt");
const {
    MISSING_PARAMS_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
    PROVIDER_NOT_FOUND_ERROR,
} = require("#ERRORS");

const editProvider = async ({ providerId, providerData, token }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Falta token de autorizacion");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    if (!providerId || !providerData) throw new MISSING_PARAMS_ERROR("Faltan parametros");

    const provider = await Providers.findOne({ where: { id: providerId } });
    if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Proveedor con id ${providerId} no encontrado`);

    provider.update(providerData);

    await provider.save();
    return provider;

};

module.exports = editProvider;
