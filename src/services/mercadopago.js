const { MercadoPagoConfig, Preference } = require('mercadopago');
const { MELI_ACCESS_TOKEN } = process.env;

const client = new MercadoPagoConfig({ accessToken: MELI_ACCESS_TOKEN });
const preference = new Preference(client);

module.exports = preference;
