const { Categories } = require('#DB_CONNECTION');

const getCategoriesController = async () => {
    const categoriesResults = await Categories.findAll();
    const categories = categoriesResults.map((category) =>
        category.name);
    return categories;
};

module.exports = getCategoriesController;
