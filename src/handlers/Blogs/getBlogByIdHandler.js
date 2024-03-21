const { BlogsControllers } = require('#CONTROLLERS');
const { getBlogById } = BlogsControllers;

const getBlogByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await getBlogById({ blogId: id });

    return res.status(200).json({
      status: 'success',
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

module.exports = getBlogByIdHandler;
