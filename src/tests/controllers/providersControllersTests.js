const { ProvidersControllers } = require("#CONTROLLERS");
const { expect } = require("chai");
require("dotenv").config();
const { TOKEN_FOR_TESTS } = process.env;

const NO_TOKEN_ERROR = {};
const DUMMY_PROVIDER_PARAMS = {
    name: "Test provider",
    discount: 10,
    markup: 20,
    token: TOKEN_FOR_TESTS,
};
const MISSING_PARAMS = {
    token: TOKEN_FOR_TESTS,
};

const PROVIDERS_CONTROLLERS_TESTS = async function () {
    // 0. Get all providers
    describe("Get all providers", () => {
        it("Should return an array of providers", async () => {
            const providers = await ProvidersControllers.getProviders({
                token: TOKEN_FOR_TESTS,
            });
            expect(providers).to.be.an("array");
        });

        it("Should return an error if no token is provided", async () => {
            try {
                await ProvidersControllers.getProviders(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });
    });

    // 1. Get provider by ID
    describe("Get provider by ID", () => {
        it("Should return a provider with id, name, discount and markup properties", async () => {
            const providers = await ProvidersControllers.getProviders({
                token: TOKEN_FOR_TESTS,
            });
            const providerFound = await ProvidersControllers.getProviderById({
                providerId: providers[0].id,
                token: TOKEN_FOR_TESTS,
            });
            expect(providerFound).to.be.an("object");
            expect(providerFound).to.have.property("id");
            expect(providerFound).to.have.property("name");
            expect(providerFound).to.have.property("discount");
            expect(providerFound).to.have.property("markup");
        });

        it("Should return an error if no token is provided", async () => {
            try {
                await ProvidersControllers.getProviderById(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });
    });

    // 2. Create provider
    describe("Create provider", () => {
        it("Should return a new provider", async () => {
            const newProvider = await ProvidersControllers.createProvider(DUMMY_PROVIDER_PARAMS);
            expect(newProvider).to.be.an("object");
            expect(newProvider).to.have.property("id");
            expect(newProvider).to.have.property("name");
            expect(newProvider).to.have.property("discount");
            expect(newProvider).to.have.property("markup");
            const destroyedProvider = await ProvidersControllers.destroyProvider({
                providerId: newProvider.id,
                token: TOKEN_FOR_TESTS,
            });
            // ids must match
            expect(destroyedProvider.id).to.be.equal(newProvider.id);
        });

        it("Should return an error if no token is provided", async () => {
            try {
                await ProvidersControllers.createProvider(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });

        it("Should return an error if missing params", async () => {
            try {
                await ProvidersControllers.createProvider(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });
    });

    // 3. Edit provider
    describe("Edit provider", () => {
        it("Should return an edited provider", async () => {
            const newProvider = await ProvidersControllers.createProvider(DUMMY_PROVIDER_PARAMS);
            const editedProvider = await ProvidersControllers.editProvider({
                providerId: newProvider.id,
                providerData: {
                    name: "Edited provider",
                    discount: 50,
                    markup: 60
                },
                token: TOKEN_FOR_TESTS,
            });
            expect(editedProvider).to.be.an("object");
            expect(editedProvider).to.have.property("id");
            expect(editedProvider).to.have.property("name");
            expect(editedProvider).to.have.property("discount");
            expect(editedProvider).to.have.property("markup");
            expect(editedProvider.name).to.be.equal("Edited provider");
            expect(editedProvider.discount).to.be.equal(50);
            expect(editedProvider.markup).to.be.equal(60);
            const destroyedProvider = await ProvidersControllers.destroyProvider({
                providerId: newProvider.id,
                token: TOKEN_FOR_TESTS,
            });
            // ids must match
            expect(destroyedProvider.id).to.be.equal(newProvider.id);
        });

        it("Should return an error if no token is provided", async () => {
            try {
                await ProvidersControllers.editProvider(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });

        it("Should return an error if missing params", async () => {
            try {
                await ProvidersControllers.editProvider(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });
    });

    // 4. Delete provider (set active to false)
    describe("Delete provider", () => {
        it("Should return a deleted provider", async () => {
            const newProvider = await ProvidersControllers.createProvider(DUMMY_PROVIDER_PARAMS);
            const deletedProvider = await ProvidersControllers.deleteProvider({
                providerId: newProvider.id,
                token: TOKEN_FOR_TESTS,
            });
            expect(deletedProvider).to.be.an("object");
            expect(deletedProvider).to.have.property("id");
            expect(deletedProvider).to.have.property("name");
            expect(deletedProvider).to.have.property("discount");
            expect(deletedProvider).to.have.property("markup");
            // active must be false
            expect(deletedProvider.active).to.be.false;
            const destroyedProvider = await ProvidersControllers.destroyProvider({
                providerId: newProvider.id,
                token: TOKEN_FOR_TESTS,
            });
            // ids must match
            expect(destroyedProvider.id).to.be.equal(newProvider.id);
        });

        it("Should return an error if no token is provided", async () => {
            try {
                await ProvidersControllers.deleteProvider(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });

        it("Should return an error if missing params", async () => {
            try {
                await ProvidersControllers.deleteProvider(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });
    });

    // 5. Destroy provider (delete from DB)
    describe("Destroy provider", () => {
        it("Should return a destroyed provider", async () => {
            const newProvider = await ProvidersControllers.createProvider(DUMMY_PROVIDER_PARAMS);
            const destroyedProvider = await ProvidersControllers.destroyProvider({
                providerId: newProvider.id,
                token: TOKEN_FOR_TESTS,
            });
            expect(destroyedProvider).to.be.an("object");
            expect(destroyedProvider).to.have.property("id");
            expect(destroyedProvider).to.have.property("name");
            expect(destroyedProvider).to.have.property("discount");
            expect(destroyedProvider).to.have.property("markup");
        });

        it("Should return an error if no token is provided", async () => {
            try {
                await ProvidersControllers.destroyProvider(NO_TOKEN_ERROR);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });

        it("Should return an error if missing params", async () => {
            try {
                await ProvidersControllers.destroyProvider(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an("error");
            }
        });
    });

};

module.exports = PROVIDERS_CONTROLLERS_TESTS;
