const { UsersControllers } = require("#CONTROLLERS");
const { expect } = require("chai");
require("dotenv").config();
const { TOKEN_FOR_TESTS } = process.env;

const generateDummyUserEmail = () => {
    const base = Math.random().toString(36).substring(2, 15);
    return `mocha-${base}@users-tests.com`;
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

const NO_TOKEN_ERROR = {};
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
const MISSING_PARAMS = {
    token: TOKEN_FOR_TESTS
};
const INVALID_PASSWORD = {
    user: {
        ...DUMMY_USER_PARAMS,
        password: '123',
    },
    token: TOKEN_FOR_TESTS
};
const NO_USER_FOUND = {
    userId: -1,
    token: TOKEN_FOR_TESTS
};

const USERS_CONTROLLERS_TESTS = async function () {
    // 0. Get all users
    describe("Get all users", () => {
        it("Should return an array of users", async () => {
            const users = await UsersControllers.getUsers({
                token: TOKEN_FOR_TESTS,
            });
            expect(users).to.be.an("array");
        });

        it("Should return an error if no token is provided", async () => {
            try {
                await UsersControllers.getUsers(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });
    });

    // 1. Create user
    describe('Create user', () => {
        it('Should return a new user', async () => {
            const newUser = await generateRandomUser();
            expect(newUser).to.be.an('object');
            expect(newUser).to.have.property('id');
            expect(newUser).to.have.property('email');
            expect(newUser).to.have.property('rol');
            expect(newUser).to.have.property('idUser');
            const destroyedUser = await UsersControllers.destroyUser({
                userId: newUser.id,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedUser.id).to.be.equal(newUser.id);
        });

        it('Should return an error if no token is provided', async () => {
            try {
                await UsersControllers.createUser(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if missing params', async () => {
            try {
                await UsersControllers.createUser(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if password is invalid', async () => {
            try {
                await UsersControllers.createUser(INVALID_PASSWORD);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if user already exists', async () => {
            const newUser = await generateRandomUser();
            try {
                await UsersControllers.createUser({
                    user: {
                        ...DUMMY_USER_PARAMS,
                        email: newUser.email,
                    },
                    token: TOKEN_FOR_TESTS
                });
            } catch (error) {
                expect(error).to.be.an('error');
            }
            const destroyedUser = await UsersControllers.destroyUser({
                userId: newUser.id,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedUser.id).to.be.equal(newUser.id);
        });
    });

    // 2. Get user by id
    describe('Get user by id', () => {
        it('Should return a user', async () => {
            const newUser = await generateRandomUser();
            const user = await UsersControllers.getUserById({
                userId: newUser.id,
                token: TOKEN_FOR_TESTS
            });
            expect(user).to.be.an('object');
            expect(user).to.have.property('id');
            expect(user).to.have.property('email');
            expect(user).to.have.property('rol');
            expect(user).to.have.property('idUser');
            const destroyedUser = await UsersControllers.destroyUser({
                userId: newUser.id,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedUser.id).to.be.equal(newUser.id);
        });

        it('Should return an error if no token is provided', async () => {
            try {
                await UsersControllers.getUserById(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if missing params', async () => {
            try {
                await UsersControllers.getUserById(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if no user is found', async () => {
            try {
                await UsersControllers.getUserById(NO_USER_FOUND);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    // 3. Update user
    describe('Update user', () => {
        it('Should return an updated user', async () => {
            const newUser = await generateRandomUser();
            const newEmail = generateDummyUserEmail();
            const updatedUser = await UsersControllers.editUser({
                userId: newUser.id,
                token: TOKEN_FOR_TESTS,
                userContent: {
                    email: newEmail
                }
            });
            expect(updatedUser).to.be.an('object');
            expect(updatedUser).to.have.property('id');
            expect(updatedUser).to.have.property('email');
            expect(updatedUser).to.have.property('rol');
            // new email must match
            expect(updatedUser.email).to.be.equal(newEmail);
            const destroyedUser = await UsersControllers.destroyUser({
                userId: newUser.id,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedUser.id).to.be.equal(newUser.id);
        });

        it('Should return an error if no token is provided', async () => {
            try {
                await UsersControllers.editUser(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if missing params', async () => {
            try {
                await UsersControllers.editUser(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if no user is found', async () => {
            try {
                await UsersControllers.editUser(NO_USER_FOUND);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    // 4. Delete user
    describe('Delete user', () => {
        it('Should return a deleted user', async () => {
            const newUser = await generateRandomUser();
            const deletedUser = await UsersControllers.deleteUser({
                userId: newUser.id,
                token: TOKEN_FOR_TESTS
            });
            expect(deletedUser).to.be.an('object');
            expect(deletedUser).to.have.property('id');
            expect(deletedUser).to.have.property('email');
            expect(deletedUser).to.have.property('rol');
            // active must be false
            expect(deletedUser.active).to.be.false;
            const destroyedUser = await UsersControllers.destroyUser({
                userId: newUser.id,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedUser.id).to.be.equal(newUser.id);
        });

        it('Should return an error if no token is provided', async () => {
            try {
                await UsersControllers.deleteUser(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if missing params', async () => {
            try {
                await UsersControllers.deleteUser(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if no user is found', async () => {
            try {
                await UsersControllers.deleteUser(NO_USER_FOUND);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });
};

module.exports = USERS_CONTROLLERS_TESTS;
