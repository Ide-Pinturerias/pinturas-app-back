const { Blogs } = require("#DB_CONNECTION");

const getBlogsByIdController = async ({ blogId }) => {
    const blog = await Blogs.findByPk(blogId);
    return blog;
};

module.exports = getBlogsByIdController;
