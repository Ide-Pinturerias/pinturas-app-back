const CARTS_CONTROLLERS_TESTS = require('./cartsControllersTests');
const CATEGORIES_CONTROLLERS_TESTS = require('./categoriesControllersTests');
const BLOGS_CONTROLLERS_TESTS = require('./blogsControllersTests');
const USERS_CONTROLLERS_TESTS = require('./usersControllersTests');
const PRODUCT_CONTROLLERS_TESTS = require('./productsControllersTests');
const PROVIDERS_CONTROLLERS_TESTS = require('./providersControllersTests');
const ORDERS_CONTROLLERS_TESTS = require('./ordersControllersTests');

const CONTROLLERS_TESTS = () => {
    describe('Categories Controllers Tests', CATEGORIES_CONTROLLERS_TESTS);
    describe('Cart Controllers Tests', CARTS_CONTROLLERS_TESTS);
    describe('Blogs Controllers Tests', BLOGS_CONTROLLERS_TESTS);
    describe('Users Controllers Tests', USERS_CONTROLLERS_TESTS);
    describe('Products Controllers Tests', PRODUCT_CONTROLLERS_TESTS);
    describe('Providers Controllers Tests', PROVIDERS_CONTROLLERS_TESTS);
    describe('Orders Controllers Tests', ORDERS_CONTROLLERS_TESTS);
};

module.exports = CONTROLLERS_TESTS;
