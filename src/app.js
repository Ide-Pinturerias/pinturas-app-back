const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('#ROUTES');
const path = require('path');
require('dotenv').config();
const { ALLOWED_ORIGINS, SESSION_SECRET } = process.env;
const { csrf } = require('#MIDDLEWARES');

// Init Express Server
const server = express();

// Session (cookies) configuration
const session = require('express-session');
server.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// CSRF protection
server.use(cookieParser());
server.use(csrf);

// Helmet
server.use(helmet());
// Proxy configuration
const trustProxyFn = (/* ip */) => {
  // Por ahora, confiamos en todas las conexiones
  return true;
};
server.set('trust proxy', trustProxyFn);
// Middleware para capturar la dirección
// IP del encabezado X - Forwarded - For cuando esté presente
server.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  req.clientIp = clientIp;
  next();
});

server.name = 'API';
// MIDDLEWARES
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use((_req, res, next) => {
  // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Origin', ALLOWED_ORIGINS);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Utilizar el middleware express.static para servir
// archivos estáticos desde la carpeta "public"
server.use(express.static(path.join(__dirname, 'public')));

// auth router attaches /login, /logout, and /callback routes to the baseURL
server.use('/', routes);

// Disable some properties
server.disable('x-powered-by');

// Error catching endware.
server.use((err, _req, res, next) => {
  const status = err.status || 500;
  if (err) {
    console.error(err);
    return res.status(status).send({
      success: false,
      error: 'Internal Server Error'
    });
  }
  if (next) next();
});

module.exports = server;
