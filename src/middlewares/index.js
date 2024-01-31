const productsUploads = require('./multerStorage');
const blogsUploads = require('./multerBlogs');
const rateLimiter = require('./rateLimiter');
const auth = require('./auth');
const isAdmin = require('./routesProtection');
const mercadoPago = require('./mercadopagoMiddleware');

module.exports = {
  productsUploads,
  rateLimiter,
  blogsUploads,
  auth,
  isAdmin,
  mercadoPago
};
