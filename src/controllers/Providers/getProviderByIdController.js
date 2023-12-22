const { Providers } = require('#DB_CONNECTION');
const { validateToken } = require('#SERVICES/jwt');
const {
  MISSING_PARAMS_ERROR,
  PROVIDER_NOT_FOUND_ERROR
} = require('#ERRORS');

const getProviderByIdController = async ({ providerId, token }) => {
  validateToken(token);

  if (!providerId) throw new MISSING_PARAMS_ERROR('Missing params');

  const provider = await Providers.findByPk(providerId);
  if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Provider with id ${providerId} not found`);

  return provider;
};

module.exports = getProviderByIdController;
