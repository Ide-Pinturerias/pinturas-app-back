const csurf = require('tiny-csrf');
require('dotenv').config();
const { CSRF_SECRET } = process.env;

// los métodos a proteger de CSRF
const CSRF_METHODS = []; // 'POST', 'PUT', 'DELETE'];
// las rutas a ignorar de CSRF // e.g. ['/detail', /\/detail\.*/i]
const CSRF_IGNORED_ROUTES = [];
// cualquier solicitud desde aquí no verá el token y no generará uno nuevo
const CSRF_IGNORED_URLS = [];

const CSRF_MIDDLEWARE = csurf(
  CSRF_SECRET,
  CSRF_METHODS,
  CSRF_IGNORED_ROUTES,
  CSRF_IGNORED_URLS
);

module.exports = CSRF_MIDDLEWARE;
