const { Categories } = require('#DB_CONNECTION');

const createCategoriesController = async ({ name }) => {

    const category = name ? Categories.findOrCreate({
        where: {
            name,
        }
    }) : null;

    return category;

};

module.exports = createCategoriesController;
