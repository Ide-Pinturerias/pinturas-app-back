const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('#ROUTES');
const path = require('path');
require('dotenv').config();
const { SESSION_SECRET, DEPLOY_URL, CORS_ORIGIN } = process.env;
const { csrf } = require('#MIDDLEWARES');
const session = require('express-session');
const cors = require('cors');

// Init Express Server
const server = express();

// CORS configuration
server.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

// Session (cookies) configuration
server.set('trust proxy', 1); // trust first proxy
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
server.use(session({
  store: new (require('connect-pg-simple')(session))({
    // Insert connect-pg-simple options here
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: DEPLOY_URL,
    path: '/',
    expires: expiryDate,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));

// CSRF protection
server.use(cookieParser());
server.use(csrf);

// Helmet (https://helmetjs.github.io/)
server.use(helmet());

// Proxy configuration
server.set('trust proxy', 'loopback');

// Middleware para capturar la dirección
// IP del encabezado X - Forwarded - For cuando esté presente
server.use((req, _res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  req.clientIp = clientIp;
  next();
});

server.name = 'IDE Pinturerías REST API';
// MIDDLEWARES
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Utilizar el middleware express.static para servir
// archivos estáticos desde la carpeta "public"
server.use(express.static(path.join(__dirname, 'public')));

// auth router attaches /login, /logout, and /callback routes to the baseURL
server.use('/', routes);

// Error catching endware
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
