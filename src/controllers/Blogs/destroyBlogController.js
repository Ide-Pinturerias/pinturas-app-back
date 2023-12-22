const { Blogs } = require('#DB_CONNECTION');
const { validateToken } = require('#SERVICES/jwt');
const {
  BLOG_NOT_FOUND_ERROR,
  MISSING_PARAMS_ERROR
} = require('#ERRORS');

const destroyBlogController = async ({ blogId, token }) => {
  validateToken(token);

  if (!blogId) throw new MISSING_PARAMS_ERROR('Missing params');

  const blog = await Blogs.findByPk(blogId);

  if (!blog) throw new BLOG_NOT_FOUND_ERROR(`Blog with id ${blogId} not found`);

  await blog.destroy();

  return blog;
};

module.exports = destroyBlogController;
