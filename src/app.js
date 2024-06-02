require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('#ROUTES');
const { SESSION_SECRET, DEPLOY_URL, CORS_ORIGIN } = process.env;
const { csrf } = require('#MIDDLEWARES');

// Init Express Server
const server = express();
server.name = 'IDE Pinturerías REST API';

// Trust proxy settings
server.set('trust proxy', 1); // trust first proxy
server.set('trust proxy', 'loopback');

// CORS configuration
server.use(cors({
  origin: [CORS_ORIGIN, 'https://idepinturerias.com', 'https://www.idepinturerias.com'],
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

// Session (cookies) configuration
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

// Helmet for security
server.use(helmet());

// Middleware to capture the client IP address
server.use((req, _res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  req.clientIp = clientIp;
  next();
});

// Body parsing middleware
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

// Logger middleware
server.use(morgan('dev'));

// Static files middleware
server.use(express.static(path.join(__dirname, 'public')));

// Main routes
server.use('/', routes);

// Error catching middleware
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
