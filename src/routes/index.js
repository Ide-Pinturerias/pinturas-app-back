// Init router
const { Router } = require('express');
const path = require('path');

// Bring Routers
const productsRoutes = require('./productsRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const usersRoutes = require('./usersRoutes');
const ordersRoutes = require('./ordersRoutes');
const mailRoutes = require('./mailRoutes');
const cartsRoutes = require('./cartsRoutes');
const favoritesRoutes = require('./favoritesRoutes');
const blogsRoutes = require('./blogsRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const providersRoutes = require('./providersRoutes');

const router = Router();

// 1. GET /
// Here we will render the home page, which will be a description of the API
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

// Categories routes
router.use('/categories', categoriesRoutes);
// Products routes
router.use('/products', productsRoutes);
// Users routes
router.use('/users', usersRoutes);
// Orders routes
router.use('/orders', ordersRoutes);
// Mail routes
router.use('/mail', mailRoutes);
// Carts Routes
router.use('/carts', cartsRoutes);
// Favorites routes
router.use('/favorites', favoritesRoutes);
// Blogs routes
router.use('/blogs', blogsRoutes);
// Reviews routes
router.use('/reviews', reviewsRoutes);
// Providers routes
router.use('/providers', providersRoutes);

module.exports = router;
