const { CategoriesControllers } = require("#CONTROLLERS");
const { expect } = require("chai");

const CATEGORIES_CONTROLLERS_TESTS = async function () {
    // 1. Get categories
    describe("Get categories", () => {
        it("Should return an array of categories", async () => {
            const categories = await CategoriesControllers.getCategories();
            expect(categories).to.be.an("array");
            expect(categories[0]).to.be.an("string");
        });
    });
};

module.exports = CATEGORIES_CONTROLLERS_TESTS;
