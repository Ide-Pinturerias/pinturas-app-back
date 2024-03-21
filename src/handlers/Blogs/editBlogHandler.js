const { BlogsControllers } = require('#CONTROLLERS');
const { editBlog } = BlogsControllers;

const editBlogHandler = async (req, res) => {
  try {
    const token = req.header('Authorization');

    const { id } = req.params;

    const blog = await editBlog({
      blogId: id,
      token,
      blogContent: req.body,
      file: req.file
    });

    return res.status(201).json({
      status: 'success',
      message: 'blog editado exitosamente',
      blog
    });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = editBlogHandler;
