const { CartsControllers, UsersControllers } = require('#CONTROLLERS');
const { expect } = require('chai');
require('dotenv').config();
const { TOKEN_FOR_TESTS } = process.env;

const USER_PARAMS = {
    name: 'Mocha',
    email: 'tests-cart@tests.com',
    password: 'Juan-123',
};
const MISSING_PARAMS = {};
const NO_CART_FOUND_PARAMS = {
    idCart: '86a597b5-5d27-418f-a59a-68f0afa78f7f',
};
const NO_USER_FOUND_PARAMS = {
    idUser: -1,
};

const createRandomUser = async () => {
    const user = await UsersControllers.createUser({
        ...USER_PARAMS,
        email: `tests-cart-${Math.random()}@tests.com`,
    });
    return user;
};

const deleteRandomUser = async (user) => {
    const destroyedUser = await UsersControllers.destroyUser({
        userId: user.id,
        token: TOKEN_FOR_TESTS,
    });
    return destroyedUser;
};

const CARTS_CONTROLLERS_TESTS = async function () {

    // 0. Get carts
    describe('Get carts', () => {
        it('Should return an array of carts',
            async () => {
                const carts = await CartsControllers.getCarts();
                expect(carts).to.be.an('array');
                expect(carts[0]).to.have.property('idCart');
                expect(carts[0]).to.have.property('idUser');
                expect(carts[0]).to.have.property('products');
            }
        );
    });

    // 1. Get cart
    describe('Get cart by ID', () => {
        it('Should return a cart with idCart, userId and products properties',
            async () => {
                const user = await createRandomUser();
                const cart = await CartsControllers.createOrFindCart({ idUser: user.id });
                const cartFound = await CartsControllers.getCart({ idCart: cart.idCart });
                expect(cartFound).to.have.property('idCart');
                expect(cartFound).to.have.property('idUser');
                expect(cartFound).to.have.property('products');
                const destroyedCart = await CartsControllers.deleteCart({
                    idUser: user.id,
                });
                const destroyedUser = await deleteRandomUser(user);
                // destroyedUser id must match with destroyedCart userId
                expect(destroyedUser.id).to.be.equal(destroyedCart.userId);
            });

        it('Should throw an error if params are missing', async () => {
            try {
                await CartsControllers.getCart(MISSING_PARAMS);
            } catch (error) {
                expect(error.message).to.equal('Missing params');
            }
        });

        it('Should throw an error if the cart is not found', async () => {
            try {
                await CartsControllers.getCart(NO_CART_FOUND_PARAMS);
            } catch (error) {
                expect(error.message).to.equal(`Cart with id ${NO_CART_FOUND_PARAMS.idCart} not found`);
            }
        });

        it('Should throw an error if no cart for the user is found', async () => {
            try {
                await CartsControllers.getCart(NO_USER_FOUND_PARAMS);
            } catch (error) {
                expect(error.message).to.equal(`Cart for user with id ${NO_USER_FOUND_PARAMS.idUser} not found`);
            }
        });
    });

    // 2. Create or find

    describe('Create or find cart', () => {
        it('Should return a cart with idCart, userId and products properties',
            async () => {
                const user = await createRandomUser();
                const cart = await CartsControllers.createOrFindCart({ idUser: user.id });
                expect(cart).to.have.property('idCart');
                expect(cart).to.have.property('userId');
                expect(cart).to.have.property('products');
                const destroyedCart = await CartsControllers.deleteCart({
                    idUser: user.id,
                });
                const destroyedUser = await deleteRandomUser(user);
                // destroyedUser id must match with destroyedCart userId
                expect(destroyedUser.id).to.be.equal(destroyedCart.userId);
            }
        );

        it('Should throw an error if params are missing', async () => {
            try {
                await CartsControllers.createOrFindCart(MISSING_PARAMS);
            } catch (error) {
                expect(error.message).to.equal('Missing params');
            }
        });

        it('Should throw an error if the user is not found', async () => {
            try {
                await CartsControllers.createOrFindCart(NO_USER_FOUND_PARAMS);
            } catch (error) {
                expect(error.message).to.equal(`User with id ${NO_USER_FOUND_PARAMS.idUser} not found`);
            }
        });

    });

    // 3. Edit cart

    describe('Edit cart', () => {
        it('Should return a cart with idCart, userId and products properties',
            async () => {
                const user = await createRandomUser();
                const cart = await CartsControllers.createOrFindCart({ idUser: user.id });
                const editedCart = await CartsControllers.editCart({
                    idCart: cart.idCart,
                    products: "{}"
                });
                expect(editedCart).to.have.property('idCart');
                expect(editedCart).to.have.property('userId');
                expect(editedCart).to.have.property('products');
                expect(editedCart.products).to.be.equal('{}');
                const destroyedCart = await CartsControllers.deleteCart({
                    idCart: cart.idCart,
                });
                const destroyedUser = await deleteRandomUser(user);
                // destroyedUser id must match with destroyedCart userId
                expect(destroyedUser.id).to.be.equal(destroyedCart.userId);
            });
    });

    // 4. Delete cart

    describe('Delete cart', () => {
        it('Should return a cart with idCart, userId and products properties', async () => {
            const user = await createRandomUser();
            const cart = await CartsControllers.createOrFindCart({ idUser: user.id });
            const destroyedCart = await CartsControllers.deleteCart({
                idCart: cart.idCart,
            });
            expect(destroyedCart).to.have.property('idCart');
            expect(destroyedCart).to.have.property('userId');
            expect(destroyedCart).to.have.property('products');
            const destroyedUser = await deleteRandomUser(user);
            // destroyedUser id must match with destroyedCart userId
            expect(destroyedUser.id).to.be.equal(destroyedCart.userId);
        });

        it('Should throw an error if params are missing', async () => {
            try {
                await CartsControllers.deleteCart(MISSING_PARAMS);
            } catch (error) {
                expect(error.message).to.equal('Missing params');
            }
        });

        it('Should throw an error if the user is not found', async () => {
            try {
                await CartsControllers.deleteCart(NO_USER_FOUND_PARAMS);
            } catch (error) {
                expect(error.message).to.equal(`User with id ${NO_USER_FOUND_PARAMS.idUser} not found`);
            }
        });
    });

};

module.exports = CARTS_CONTROLLERS_TESTS;
