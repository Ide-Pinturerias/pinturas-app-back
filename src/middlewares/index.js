const productsUploads = require('./multerStorage');
const blogsUploads = require('./multerBlogs');
const createRateLimiter = require('./rateLimiter');
const auth = require('./auth');
const isAdmin = require('./routesProtection');
const csrf = require('./csrf');
const mercadoPago = require('./mercadopagoMiddleware');

module.exports = {
  productsUploads,
  createRateLimiter,
  blogsUploads,
  auth,
  isAdmin,
  csrf,
  mercadoPago
};
