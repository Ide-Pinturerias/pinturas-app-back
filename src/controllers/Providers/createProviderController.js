const { Providers } = require('#DB_CONNECTION');
const { validateToken } = require('#SERVICES/jwt');
const {
  MISSING_PARAMS_ERROR
} = require('#ERRORS');

const createProviderController = async ({ name, discount, markup, token }) => {
  validateToken(token);

  if (!name || !discount || !markup) throw new MISSING_PARAMS_ERROR('Faltan parametros');

  const provider = new Providers({
    name: name.toUpperCase(),
    discount,
    markup
  });

  // Guardar los cambios
  await provider.save();

  return provider;
};

module.exports = createProviderController;
