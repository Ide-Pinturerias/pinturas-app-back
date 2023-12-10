const { CartsControllers } = require('#CONTROLLERS');
const { expect } = require('chai');


const CARTS_CONTROLLERS_TESTS = async function () {

    describe('Cart Controllers Tests', async () => {
        // TODO: Create mock data
        let allCarts = await CartsControllers.getCarts();
        const params = {
            idUser: allCarts[0].idUser
        };
        const missingParams = {
        };
        const noUserFoundParams = {
            idUser: '999'
        };
        const noCartFoundParams = {
            idCart: [...allCarts[0].idCart].reverse().join('')
        };
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
        describe('Get cart', () => {
            it('Should return a cart with idCart, userId and products properties',
                async () => {
                    const cart = await CartsControllers.getCart(params);
                    expect(cart).to.have.property('idCart');
                    expect(cart).to.have.property('idUser');
                    expect(cart).to.have.property('products');
                });
        });

        // 2. Create or find
        describe('Create or find cart', () => {
            it('Should return a cart with idCart, userId and products properties',
                async () => {
                    const cart = await CartsControllers.createOrFindCart(params);
                    expect(cart).to.have.property('idCart');
                    expect(cart).to.have.property('userId');
                    expect(cart).to.have.property('products');
                }
            );

            it('Should throw an error if params are missing', async () => {
                try {
                    await CartsControllers.createOrFindCart(missingParams);
                } catch (error) {
                    expect(error.message).to.equal('Missing params');
                }
            });

            it('Should throw an error if the user is not found', async () => {
                try {
                    await CartsControllers.createOrFindCart(noUserFoundParams);
                } catch (error) {
                    expect(error.message).to.equal(`User with id ${noUserFoundParams.idUser} not found`);
                }
            });
        });

        // 3. Delete cart
        describe('Delete cart', () => {
            const params = {
                idUser: allCarts[0].idUser,
            };
            const restoreCart = {
                idUser: params.idUser,
            };
            it('Should return a cart with idCart, userId and products properties',
                async () => {
                    const cart = await CartsControllers.deleteCart(params);
                    expect(cart).to.have.property('idCart');
                    expect(cart).to.have.property('userId');
                    expect(cart).to.have.property('products');
                    restoreCart.products = cart.products;
                }
            );

            after(async () => {
                await CartsControllers.createOrFindCart(restoreCart);
                await CartsControllers.editCart(restoreCart);
            });

            it('Should throw an error if params are missing', async () => {
                try {
                    await CartsControllers.deleteCart(missingParams);
                } catch (error) {
                    expect(error.message).to.equal('Missing params');
                }
            });

            it('Should throw an error if the user is not found', async () => {
                try {
                    await CartsControllers.deleteCart(noUserFoundParams);
                } catch (error) {
                    expect(error.message).to.equal(`User with id ${noUserFoundParams.idUser} not found`);
                }
            });

        });

        // 4. Edit cart
        describe('Edit cart', async () => {
            allCarts = await CartsControllers.getCarts();
            it('Should return a cart with idCart, userId and products properties',
                async () => {
                    const cart = await CartsControllers.editCart(params);
                    expect(cart).to.have.property('idCart');
                    expect(cart).to.have.property('userId');
                    expect(cart).to.have.property('products');
                }
            );

            it('Should throw an error if params are missing', async () => {
                try {
                    await CartsControllers.editCart(missingParams);
                } catch (error) {
                    expect(error.message).to.equal('Missing params');
                }
            });

            it('Should throw an error if the cart is not found', async () => {
                try {
                    await CartsControllers.editCart(noCartFoundParams);
                } catch (error) {
                    expect(error.message).to.equal(`Cart with id ${noCartFoundParams.idCart} not found`);
                }
            });
        });

    });

};

module.exports = CARTS_CONTROLLERS_TESTS;
