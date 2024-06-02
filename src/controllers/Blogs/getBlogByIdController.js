const { Blogs } = require('#DB_CONNECTION');
const { BLOG_NOT_FOUND_ERROR, MISSING_PARAMS_ERROR } = require('#ERRORS');

const getBlogByIdController = async ({ blogId }) => {
  if (!blogId) throw new MISSING_PARAMS_ERROR('Missing params');
  const blog = await Blogs.findByPk(blogId);
  if (!blog) throw new BLOG_NOT_FOUND_ERROR(`Blog with id ${blogId} not found`);
  return blog;
};

module.exports = getBlogByIdController;
