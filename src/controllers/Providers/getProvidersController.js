const { Providers } = require("#DB_CONNECTION");
const decodedToken = require("#SERVICES/decodedJwt");
const {
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require("#ERRORS");

const getProvidersController = async ({ token }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Falta token de autorizacion");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    const providers = await Providers.findAll();
    return providers;

};

module.exports = getProvidersController;
