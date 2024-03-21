const { Providers } = require('#DB_CONNECTION');
const { validateToken } = require('#SERVICES/jwt');
const {
  MISSING_PARAMS_ERROR,
  PROVIDER_NOT_FOUND_ERROR
} = require('#ERRORS');

const editProvider = async ({ providerId, providerData, token }) => {
  validateToken(token);

  if (!providerId || !providerData) throw new MISSING_PARAMS_ERROR('Missing params');

  const provider = await Providers.findOne({ where: { id: providerId } });
  if (!provider) throw new PROVIDER_NOT_FOUND_ERROR(`Proveedor con id ${providerId} no encontrado`);

  provider.update(providerData);

  await provider.save();
  return provider;
};

module.exports = editProvider;
