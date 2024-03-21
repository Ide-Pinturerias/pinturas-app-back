const { BlogsControllers } = require('#CONTROLLERS');
const { destroyBlog } = BlogsControllers;

const destroyBlogHandler = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { blogId } = req.body;
    const destroyedBlog = await destroyBlog({ blogId, token });

    return res.status(200).json({
      status: 'success',
      message: 'Blog destruído correctamente',
      blog: destroyedBlog
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = destroyBlogHandler;
