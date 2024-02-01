const productsUploads = require('./multerStorage');
const blogsUploads = require('./multerBlogs');
const createRateLimiter = require('./rateLimiter');
const auth = require('./auth');
const isAdmin = require('./routesProtection');
const csrf = require('./csrf');
const mercadoPago = require('./mercadopagoMiddleware');
const uploadXlsx = require('./multerXlsx');

module.exports = {
  productsUploads,
  createRateLimiter,
  blogsUploads,
  auth,
  isAdmin,
  csrf,
  mercadoPago,
  uploadXlsx
};
