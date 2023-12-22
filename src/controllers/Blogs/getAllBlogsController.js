const { Blogs } = require("#DB_CONNECTION");

const getAllBlogsController = async () => {
    const blogs = await Blogs.findAll();
    return blogs;
};

module.exports = getAllBlogsController;
