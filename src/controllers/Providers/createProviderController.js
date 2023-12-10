const { Providers } = require("#DB_CONNECTION");
const decodedToken = require("#SERVICES/decodedJwt");
const {
    MISSING_PARAMS_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require("#ERRORS");

const createProviderController = async ({ name, discount, markup, token }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Falta token de autorizacion");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    if (!name || !discount || !markup) throw new MISSING_PARAMS_ERROR("Faltan parametros");

    const provider = new Providers({
        name: name.toUpperCase(),
        discount,
        markup
    });
    //Guardar el provider en la base de datos
    await provider.save();

    return provider;
};

module.exports = createProviderController;
