// Init router
const { Router } = require('express');
// Bring Routers
const productsRoutes = require('./productsRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const usersRoutes = require('./usersRoutes');
const ordersRoutes = require("./ordersRoutes");
const mailRoutes = require("./mailRoutes");

const router = Router();

// 1. GET /
// Here we will render the home page, which will be a description of the API
const description = require('./description.json');

// Use a middleware to render the description and load files from the public
// folder
router.get('/', (req, res) => {
    return res.json(description);
});

// Categories routes
router.use('/categories', categoriesRoutes);
// Products routes
router.use('/products', productsRoutes);
// Users routes
router.use('/users', usersRoutes);
// Orders routes
router.use("/orders", ordersRoutes);
// Mail routes
router.use("/mail", mailRoutes);

module.exports = router;
