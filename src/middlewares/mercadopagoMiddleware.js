require('dotenv').config();
const { MELI_ACCESS_TOKEN, NODE_ENV } = process.env;
const generateSignatures = require('#UTILS/generateSignatures');

/**
 * Los parámetros con el sufijo _url provienen de query params. Ejemplo:
 * [topic_url] se sustituirá por el valor `payment`` (sin corchetes).
 * Los parámetros con el sufijo _json provienen del body de la solicitud.
 * [urlpath] será solo el dominio + el path de la URL
 * (sin "http://" o "https://").
 * [timestamp] será el valor ts extraído del header x-signature.
 */

// post;[urlpath];data.id=[data.id_url];type=[topic_url];user-agent:mercadopago webhook v1.0;[timestamp];action:[json_action];api_version:[json_apiversion];date_created:[json_datecreated_RFC3339];id:[id_json];live_mode:[livemode_json];type:[type_json];user_id:[userid_json];

const mercadopagoMiddleware = (req, res, next) => {
  const { query, body } = req;
  const {
    parsedSignature,
    cyphedSignature,
    key
  } = generateSignatures({
    query,
    body,
    xSignature: req.headers['x-signature'],
    reqPath: req.path
  });

  if (NODE_ENV === 'local' || NODE_ENV === 'tunnel') {
    console.info('MercadoPago Middleware: Local or Tunnel');
    console.info('parsedSignature:', parsedSignature);
    console.info('cyphedSignature:', cyphedSignature);
    console.info('key:', key);
  }

  const queryDataId = query['data.id'];

  if (queryDataId === '123456') {
    // Pruebas locales
    console.info('Prueba Middleware MercadoPago: OK');
    return res.status(200).json({ status: 'success' });
  }

  const url = `https://api.mercadopago.com/v1/payments/${queryDataId}?access_token=${MELI_ACCESS_TOKEN}`;
  fetch(url).then((response) => response.json()).then((data) => {
    console.info('data:', data);
    if (data.status === 'ok' || data.status === 'approved') {
      console.info('Payment approved');
      console.info('Proceeding to next middleware');
      next();
    } else {
      console.info('Error processing payment notification');
      console.error(data);
      return res.status(200).json({ status: 'sucess' }); // OK response to MercadoPago
    }
  });
};

module.exports = mercadopagoMiddleware;
