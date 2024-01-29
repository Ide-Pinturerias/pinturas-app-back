const {
  createHmac
} = require('node:crypto');
require('dotenv').config();
const { MELI_SECRET, NODE_ENV, TUNNEL_URL, DEPLOY_URL } = process.env;

/**
 * Los parámetros con el sufijo _url provienen de query params. Ejemplo:
 * [topic_url] se sustituirá por el valor `payment`` (sin corchetes).
 * Los parámetros con el sufijo _json provienen del body de la solicitud.
 * [urlpath] será solo el dominio + el path de la URL
 * (sin "http://" o "https://").
 * [timestamp] será el valor ts extraído del header x-signature.
 */

const urlBase = NODE_ENV === 'tunnel' ? TUNNEL_URL : DEPLOY_URL;

// post;[urlpath];data.id=[data.id_url];type=[topic_url];user-agent:mercadopago webhook v1.0;[timestamp];action:[json_action];api_version:[json_apiversion];date_created:[json_datecreated_RFC3339];id:[id_json];live_mode:[livemode_json];type:[type_json];user_id:[userid_json];

const generateSignatures = ({ query, body, xSignature, reqPath: path }) => {
  // const { idOrder } = req.params;
  let parsedSignature = `post;${urlBase.replace('https://', '')}${path};`;
  if (query?.['data.id']) {
    parsedSignature += `data.id=${query['data.id']};`;
  }
  if (query?.type) {
    parsedSignature += `type=${query.type};`;
  }
  parsedSignature += 'user-agent:mercadopago webhook v1.0;';
  // xSignature
  // get the timestamp and the signature
  const [ts, key] = xSignature.split(',');
  // get the timestamp value
  const [, tsValue] = ts.split('=');
  // add the timestamp to the signature
  parsedSignature += `${tsValue};`;
  if (body?.action) {
    parsedSignature += `action:${body.action};`;
  }
  if (body?.api_version) {
    parsedSignature += `api_version:${body.api_version};`;
  }
  if (body?.date_created) {
    parsedSignature += `date_created:${body.date_created};`;
  }
  if (body?.id) {
    parsedSignature += `id:${body.id};`;
  }
  if (body?.live_mode) {
    parsedSignature += `live_mode:${body.live_mode};`;
  }
  if (body?.type) {
    parsedSignature += `type:${body.type};`;
  }
  if (body?.user_id) {
    parsedSignature += `user_id:${body.user_id};`;
  }
  const hMac = createHmac('sha256', MELI_SECRET);
  const cyphedSignature = hMac.update(parsedSignature).digest('hex');

  return {
    parsedSignature,
    cyphedSignature,
    key
  };
};

module.exports = generateSignatures;
