const { OrdersControllers, UsersControllers } = require("#CONTROLLERS");
const { expect } = require("chai");
require("dotenv").config();
const { TOKEN_FOR_TESTS } = process.env;

const ORDERS_PARAMS = {
    products: "{\"ids\":[1,2,3],\"qus\":[1,2,3]}",
};
const MISSING_PARAMS = {
};
const NO_USER_PARAMS = {
    idUser: -1,
    ...ORDERS_PARAMS,
};
const NO_ORDER_FOUND = {
    orderId: 'b93c9747-63ad-4fab-b870-46ffca70d05f',
    orderContent: {
        products: "{\"ids\":[1,2,3,4],\"qus\":[1,2,3,4]}",
    }
};

const DUMMY_USER_PARAMS = {
    password: 'Juan-123',
    rol: 'client',
    name: 'Test',
    lastName: 'User',
    address: 'Test 123',
    locality: 'Test',
    province: 'Test',
    phone: '1234567890'
};

const generateDummyUserEmail = () => {
    const base = Math.random().toString(36).substring(2, 15);
    return `mocha-${base}@orders-tests.com`;
};

const generateRandomUser = async () => {
    const user = await UsersControllers.createUser({
        user: {
            ...DUMMY_USER_PARAMS,
            email: generateDummyUserEmail(),
        },
        token: TOKEN_FOR_TESTS,
    });
    return user;
};


const ORDERS_CONTROLLERS_TESTS = async function () {
    // 0. Get all orders
    describe("Get orders", () => {
        it("Should return an array of orders", async () => {
            const orders = await OrdersControllers.getOrders({});
            expect(orders).to.be.an("array");
        });
    });

    // 1. Create order
    describe('Create order', () => {
        it('Should return a new order', async () => {
            const user = await generateRandomUser();
            const order = await OrdersControllers.createOrder({
                ...ORDERS_PARAMS,
                idUser: user.id,
            });
            expect(order).to.be.an('object');
            expect(order).to.have.property('id');
            expect(order).to.have.property('products');

            // delete dummy user
            const destroyedUser = await UsersControllers.destroyUser({
                userId: user.id,
                token: TOKEN_FOR_TESTS,
            });
            // delete dummy order
            const destroyedOrder = await OrdersControllers.destroyOrder({
                orderId: order.id,
            });
            // ids should be equal
            expect(destroyedUser.id).to.be.equal(user.id);
            expect(destroyedOrder.id).to.be.equal(order.id);
        });

        it('Should return an error if missing params', async () => {
            try {
                await OrdersControllers.createOrder(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('MISSING_PARAMS_ERROR');
            }
        });

        it('Should return an error if no user is found', async () => {
            try {
                await OrdersControllers.createOrder(NO_USER_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('USER_NOT_FOUND_ERROR');
            }
        });
    });

    // 2. Edit order
    describe('Edit order', () => {
        it('Should return an edited order', async () => {
            const user = await generateRandomUser();
            const order = await OrdersControllers.createOrder({
                ...ORDERS_PARAMS,
                idUser: user.id,
            });
            const editedOrder = await OrdersControllers.editOrder({
                orderId: order.id,
                orderContent: {
                    products: "{\"ids\":[1,2,3,4],\"qus\":[1,2,3,4]}",
                }
            });
            expect(editedOrder).to.be.an('object');
            expect(editedOrder).to.have.property('id');
            expect(editedOrder).to.have.property('products');
            expect(editedOrder.products).to.be.equal("{\"ids\":[1,2,3,4],\"qus\":[1,2,3,4]}");

            // delete dummy user
            const destroyedUser = await UsersControllers.destroyUser({
                userId: user.id,
                token: TOKEN_FOR_TESTS,
            });
            // delete dummy order
            const destroyedOrder = await OrdersControllers.destroyOrder({
                orderId: order.id,
            });
            // ids should be equal
            expect(destroyedUser.id).to.be.equal(user.id);
            expect(destroyedOrder.id).to.be.equal(order.id);
        });

        it('Should return an error if missing params', async () => {
            try {
                await OrdersControllers.editOrder(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('MISSING_PARAMS_ERROR');
            }
        });

        it('Should return an error if no order is found', async () => {
            try {
                await OrdersControllers.editOrder(NO_ORDER_FOUND);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('ORDER_NOT_FOUND_ERROR');
            }
        });
    });

    // 3. Get order by user id
    describe('Get order by user id', () => {
        it('Should return an array of orders', async () => {
            const user = await generateRandomUser();
            const order = await OrdersControllers.createOrder({
                ...ORDERS_PARAMS,
                idUser: user.id,
            });
            const ordersFound = await OrdersControllers.getOrdersByUserId({
                userId: user.id,
            });
            expect(ordersFound).to.be.an('array');

            // delete dummy user
            const destroyedUser = await UsersControllers.destroyUser({
                userId: user.id,
                token: TOKEN_FOR_TESTS,
            });
            // delete dummy order
            const destroyedOrder = await OrdersControllers.destroyOrder({
                orderId: order.id,
            });
            // ids should be equal
            expect(destroyedUser.id).to.be.equal(user.id);
            expect(destroyedOrder.id).to.be.equal(order.id);
        });

        it('Should return an error if missing params', async () => {
            try {
                await OrdersControllers.getOrdersByUserId(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('MISSING_PARAMS_ERROR');
            }
        });

        it('Should return an error if no user is found', async () => {
            try {
                await OrdersControllers.getOrdersByUserId({
                    userId: -1
                });
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('USER_NOT_FOUND_ERROR');
            }
        });
    });

    // 4. Go to checkout
    describe('Go to payment', () => {
        it('Should return a preference', async () => {
            const user = await generateRandomUser();
            const order = await OrdersControllers.createOrder({
                ...ORDERS_PARAMS,
                idUser: user.id,
            });
            const preference = await OrdersControllers.paymentOrder({
                orderId: order.id,
            });
            expect(preference).to.be.an('object');
            expect(preference).to.have.property('back_urls');
            expect(preference).to.have.property('items');

            // delete dummy user
            const destroyedUser = await UsersControllers.destroyUser({
                userId: user.id,
                token: TOKEN_FOR_TESTS,
            });
            // delete dummy order
            const destroyedOrder = await OrdersControllers.destroyOrder({
                orderId: order.id,
            });
            // ids should be equal
            expect(destroyedUser.id).to.be.equal(user.id);
            expect(destroyedOrder.id).to.be.equal(order.id);
        });

        it('Should return an error if missing params', async () => {
            try {
                await OrdersControllers.paymentOrder(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('MISSING_PARAMS_ERROR');
            }
        });

        it('Should return an error if no order is found', async () => {
            try {
                await OrdersControllers.paymentOrder(NO_ORDER_FOUND);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('ORDER_NOT_FOUND_ERROR');
            }
        });
    });

    // 5. Destroy order
    describe('Destroy order', () => {
        it('Should return a destroyed order', async () => {
            const user = await generateRandomUser();
            const order = await OrdersControllers.createOrder({
                ...ORDERS_PARAMS,
                idUser: user.id,
            });
            const destroyedOrder = await OrdersControllers.destroyOrder({
                orderId: order.id,
            });
            expect(destroyedOrder).to.be.an('object');
            expect(destroyedOrder).to.have.property('id');
            expect(destroyedOrder).to.have.property('products');

            // delete dummy user
            const destroyedUser = await UsersControllers.destroyUser({
                userId: user.id,
                token: TOKEN_FOR_TESTS,
            });
            // ids should be equal
            expect(destroyedUser.id).to.be.equal(user.id);
            expect(destroyedOrder.id).to.be.equal(order.id);
        });

        it('Should return an error if missing params', async () => {
            try {
                await OrdersControllers.destroyOrder(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('MISSING_PARAMS_ERROR');
            }
        });

        it('Should return an error if no order is found', async () => {
            try {
                await OrdersControllers.destroyOrder({
                    orderId: NO_ORDER_FOUND.orderId,
                });
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.name).to.be.equal('ORDER_NOT_FOUND_ERROR');
            }
        });
    });
};

module.exports = ORDERS_CONTROLLERS_TESTS;
