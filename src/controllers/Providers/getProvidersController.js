const { Providers } = require("#DB_CONNECTION");
const { validateToken } = require("#SERVICES/jwt");

const getProvidersController = async ({ token }) => {

    validateToken(token);

    const providers = await Providers.findAll();
    return providers;

};

module.exports = getProvidersController;
