const CARTS_CONTROLLERS_TESTS = require('./cartsControllersTests');
const CATEGORIES_CONTROLLERS_TESTS = require('./categoriesControllersTests');

const CONTROLLERS_TESTS = () => {
    describe('Categories Controllers Tests', CATEGORIES_CONTROLLERS_TESTS);
    describe('Cart Controllers Tests', CARTS_CONTROLLERS_TESTS);
};

module.exports = CONTROLLERS_TESTS;
